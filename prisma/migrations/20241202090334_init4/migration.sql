/*
  Warnings:

  - The values [RANK] on the enum `Metric` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `possibility` on the `PuzzleSet_Of_Event` table. All the data in the column will be lost.
  - You are about to drop the column `possibility` on the `Reward_RuleFor_GameOfEvent` table. All the data in the column will be lost.
  - You are about to drop the column `puzzleSetOfEventId` on the `UserJoinEvent_Exchange_PuzzleSetOfEvent` table. All the data in the column will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PromotionOfEvent_For_PuzzleSetOfEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserJoinEvent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rewardRuleForGameOfEventId` to the `Reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isWin` to the `UserJoinEvent_Exchange_PuzzleSetOfEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Metric_new" AS ENUM ('TOP', 'SCORE');
ALTER TABLE "Reward_RuleFor_GameOfEvent" ALTER COLUMN "metric" TYPE "Metric_new" USING ("metric"::text::"Metric_new");
ALTER TYPE "Metric" RENAME TO "Metric_old";
ALTER TYPE "Metric_new" RENAME TO "Metric";
DROP TYPE "Metric_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_rewardId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_userJoinEventJoinGameOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionOfEvent_For_PuzzleSetOfEvent" DROP CONSTRAINT "PromotionOfEvent_For_PuzzleSetOfEvent_promotionOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionOfEvent_For_PuzzleSetOfEvent" DROP CONSTRAINT "PromotionOfEvent_For_PuzzleSetOfEvent_puzzleSetOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "Reward_RuleFor_GameOfEvent" DROP CONSTRAINT "Reward_RuleFor_GameOfEvent_rewardId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent" DROP CONSTRAINT "UserJoinEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" DROP CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_puzzleSetOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" DROP CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_userJoinEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" DROP CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_userJoinEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Join_GameOfEvent" DROP CONSTRAINT "UserJoinEvent_Join_GameOfEvent_userJoinEventId_fkey";

-- AlterTable
ALTER TABLE "PuzzleSet_Of_Event" DROP COLUMN "possibility";

-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "rewardRuleForGameOfEventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reward_RuleFor_GameOfEvent" DROP COLUMN "possibility";

-- AlterTable
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" DROP COLUMN "puzzleSetOfEventId",
ADD COLUMN     "isWin" BOOLEAN NOT NULL,
ADD COLUMN     "puzzleSet_Of_EventId" INTEGER,
ALTER COLUMN "userJoinEventId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserJoinEvent_Join_GameOfEvent" ADD COLUMN     "top" INTEGER;

-- DropTable
DROP TABLE "History";

-- DropTable
DROP TABLE "PromotionOfEvent_For_PuzzleSetOfEvent";

-- DropTable
DROP TABLE "UserJoinEvent";

-- CreateTable
CREATE TABLE "User_Join_Event" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userFacebook" TEXT,
    "joinDate" TIMESTAMP(3) NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "User_Join_Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJoinEvent_Has_PromotionOfEvent" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "promotionOfEventId" INTEGER NOT NULL,
    "userJoinEventId" INTEGER NOT NULL,

    CONSTRAINT "UserJoinEvent_Has_PromotionOfEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionOfEvent_Prize_PuzzleSetOfEvent" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "puzzleSetOfEventId" INTEGER NOT NULL,
    "promotionOfEventId" INTEGER NOT NULL,

    CONSTRAINT "PromotionOfEvent_Prize_PuzzleSetOfEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJoinEventJoinGameOfEvent_History" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userJoinEventJoinGameOfEventId" INTEGER NOT NULL,

    CONSTRAINT "UserJoinEventJoinGameOfEvent_History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJoinEventJoinGameOfEvent_Has_TopReward" (
    "id" SERIAL NOT NULL,
    "userJoinEventJoinGameOfEventId" INTEGER NOT NULL,
    "rewardId" INTEGER NOT NULL,

    CONSTRAINT "UserJoinEventJoinGameOfEvent_Has_TopReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward" (
    "id" SERIAL NOT NULL,
    "userJoinEventJoinGameOfEventHistoryId" INTEGER NOT NULL,
    "rewardId" INTEGER NOT NULL,

    CONSTRAINT "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Join_Event_userId_eventId_key" ON "User_Join_Event"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "UserJoinEvent_Has_PromotionOfEvent_promotionOfEventId_userJ_key" ON "UserJoinEvent_Has_PromotionOfEvent"("promotionOfEventId", "userJoinEventId");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionOfEvent_Prize_PuzzleSetOfEvent_puzzleSetOfEventId__key" ON "PromotionOfEvent_Prize_PuzzleSetOfEvent"("puzzleSetOfEventId", "promotionOfEventId");

-- CreateIndex
CREATE UNIQUE INDEX "UserJoinEventJoinGameOfEvent_History_date_userJoinEventJoin_key" ON "UserJoinEventJoinGameOfEvent_History"("date", "userJoinEventJoinGameOfEventId");

-- CreateIndex
CREATE UNIQUE INDEX "UserJoinEventJoinGameOfEvent_Has_TopReward_userJoinEventJoi_key" ON "UserJoinEventJoinGameOfEvent_Has_TopReward"("userJoinEventJoinGameOfEventId", "rewardId");

-- CreateIndex
CREATE UNIQUE INDEX "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward_userJoi_key" ON "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward"("userJoinEventJoinGameOfEventHistoryId", "rewardId");

-- AddForeignKey
ALTER TABLE "User_Join_Event" ADD CONSTRAINT "User_Join_Event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "User_Join_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PromotionOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PromotionOfEvent_promotionOfEventId_fkey" FOREIGN KEY ("promotionOfEventId") REFERENCES "Promotion_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PromotionOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PromotionOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "User_Join_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" ADD CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_puzzleSet_Of_Event_fkey" FOREIGN KEY ("puzzleSet_Of_EventId") REFERENCES "PuzzleSet_Of_Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" ADD CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "User_Join_Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionOfEvent_Prize_PuzzleSetOfEvent" ADD CONSTRAINT "PromotionOfEvent_Prize_PuzzleSetOfEvent_puzzleSetOfEventId_fkey" FOREIGN KEY ("puzzleSetOfEventId") REFERENCES "PuzzleSet_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionOfEvent_Prize_PuzzleSetOfEvent" ADD CONSTRAINT "PromotionOfEvent_Prize_PuzzleSetOfEvent_promotionOfEventId_fkey" FOREIGN KEY ("promotionOfEventId") REFERENCES "Promotion_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_rewardRuleForGameOfEventId_fkey" FOREIGN KEY ("rewardRuleForGameOfEventId") REFERENCES "Reward_RuleFor_GameOfEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Join_GameOfEvent" ADD CONSTRAINT "UserJoinEvent_Join_GameOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "User_Join_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEvent_History" ADD CONSTRAINT "UserJoinEventJoinGameOfEvent_History_userJoinEventJoinGame_fkey" FOREIGN KEY ("userJoinEventJoinGameOfEventId") REFERENCES "UserJoinEvent_Join_GameOfEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEvent_Has_TopReward" ADD CONSTRAINT "UserJoinEventJoinGameOfEvent_Has_TopReward_userJoinEventJo_fkey" FOREIGN KEY ("userJoinEventJoinGameOfEventId") REFERENCES "UserJoinEvent_Join_GameOfEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEvent_Has_TopReward" ADD CONSTRAINT "UserJoinEventJoinGameOfEvent_Has_TopReward_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward" ADD CONSTRAINT "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward_userJo_fkey" FOREIGN KEY ("userJoinEventJoinGameOfEventHistoryId") REFERENCES "UserJoinEventJoinGameOfEvent_History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward" ADD CONSTRAINT "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward_reward_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
