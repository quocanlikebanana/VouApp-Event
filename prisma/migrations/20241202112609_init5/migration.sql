/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Game_Of_Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PromotionOfEvent_Prize_PuzzleSetOfEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Promotion_Of_Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PuzzleSet_Of_Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Puzzle_Of_Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reward` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `promotionOrPuzzleId` on the `Reward` table. All the data in the column will be lost.
  - The primary key for the `Reward_RuleFor_GameOfEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserJoinEventJoinGameOfEventHistory_Has_ScoreReward` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserJoinEventJoinGameOfEvent_Has_TopReward` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserJoinEventJoinGameOfEvent_History` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserJoinEvent_Exchange_PuzzleSetOfEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserJoinEvent_Has_PromotionOfEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserJoinEvent_Has_PuzzleOfEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserJoinEvent_Join_GameOfEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User_Join_Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[rewardId,type,quantity]` on the table `Reward` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rewardId` to the `Reward` table without a default value. This is not possible if the table is not empty.
  - Made the column `userJoinEventId` on table `UserJoinEvent_Exchange_PuzzleSetOfEvent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `puzzleSet_Of_EventId` on table `UserJoinEvent_Exchange_PuzzleSetOfEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Game_Of_Event" DROP CONSTRAINT "Game_Of_Event_eventId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionOfEvent_Prize_PuzzleSetOfEvent" DROP CONSTRAINT "PromotionOfEvent_Prize_PuzzleSetOfEvent_promotionOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionOfEvent_Prize_PuzzleSetOfEvent" DROP CONSTRAINT "PromotionOfEvent_Prize_PuzzleSetOfEvent_puzzleSetOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "Promotion_Of_Event" DROP CONSTRAINT "Promotion_Of_Event_eventId_fkey";

-- DropForeignKey
ALTER TABLE "PuzzleSet_Of_Event" DROP CONSTRAINT "PuzzleSet_Of_Event_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Puzzle_Of_Event" DROP CONSTRAINT "Puzzle_Of_Event_puzzleSetOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "Reward" DROP CONSTRAINT "Reward_rewardRuleForGameOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "Reward_RuleFor_GameOfEvent" DROP CONSTRAINT "Reward_RuleFor_GameOfEvent_gameOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward" DROP CONSTRAINT "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward_reward_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward" DROP CONSTRAINT "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward_userJo_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEvent_Has_TopReward" DROP CONSTRAINT "UserJoinEventJoinGameOfEvent_Has_TopReward_rewardId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEvent_Has_TopReward" DROP CONSTRAINT "UserJoinEventJoinGameOfEvent_Has_TopReward_userJoinEventJo_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEventJoinGameOfEvent_History" DROP CONSTRAINT "UserJoinEventJoinGameOfEvent_History_userJoinEventJoinGame_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" DROP CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_puzzleSet_Of_Event_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" DROP CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_userJoinEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Has_PromotionOfEvent" DROP CONSTRAINT "UserJoinEvent_Has_PromotionOfEvent_promotionOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Has_PromotionOfEvent" DROP CONSTRAINT "UserJoinEvent_Has_PromotionOfEvent_userJoinEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" DROP CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_puzzleOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" DROP CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_userJoinEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Join_GameOfEvent" DROP CONSTRAINT "UserJoinEvent_Join_GameOfEvent_gameOfEventId_fkey";

-- DropForeignKey
ALTER TABLE "UserJoinEvent_Join_GameOfEvent" DROP CONSTRAINT "UserJoinEvent_Join_GameOfEvent_userJoinEventId_fkey";

-- DropForeignKey
ALTER TABLE "User_Join_Event" DROP CONSTRAINT "User_Join_Event_eventId_fkey";

-- DropIndex
DROP INDEX "Reward_promotionOrPuzzleId_type_quantity_key";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "partnerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Event_id_seq";

-- AlterTable
ALTER TABLE "Game_Of_Event" DROP CONSTRAINT "Game_Of_Event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "gameId" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Game_Of_Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Game_Of_Event_id_seq";

-- AlterTable
ALTER TABLE "PromotionOfEvent_Prize_PuzzleSetOfEvent" DROP CONSTRAINT "PromotionOfEvent_Prize_PuzzleSetOfEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "puzzleSetOfEventId" SET DATA TYPE TEXT,
ALTER COLUMN "promotionOfEventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PromotionOfEvent_Prize_PuzzleSetOfEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PromotionOfEvent_Prize_PuzzleSetOfEvent_id_seq";

-- AlterTable
ALTER TABLE "Promotion_Of_Event" DROP CONSTRAINT "Promotion_Of_Event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "promotionId" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Promotion_Of_Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Promotion_Of_Event_id_seq";

-- AlterTable
ALTER TABLE "PuzzleSet_Of_Event" DROP CONSTRAINT "PuzzleSet_Of_Event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "puzzleSetId" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PuzzleSet_Of_Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PuzzleSet_Of_Event_id_seq";

-- AlterTable
ALTER TABLE "Puzzle_Of_Event" DROP CONSTRAINT "Puzzle_Of_Event_pkey",
ALTER COLUMN "puzzleId" SET DATA TYPE TEXT,
ALTER COLUMN "puzzleSetOfEventId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Puzzle_Of_Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Puzzle_Of_Event_id_seq";

-- AlterTable
ALTER TABLE "Reward" DROP CONSTRAINT "Reward_pkey",
DROP COLUMN "promotionOrPuzzleId",
ADD COLUMN     "rewardId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "rewardRuleForGameOfEventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reward_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Reward_id_seq";

-- AlterTable
ALTER TABLE "Reward_RuleFor_GameOfEvent" DROP CONSTRAINT "Reward_RuleFor_GameOfEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "gameOfEventId" SET DATA TYPE TEXT,
ALTER COLUMN "rewardId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reward_RuleFor_GameOfEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Reward_RuleFor_GameOfEvent_id_seq";

-- AlterTable
ALTER TABLE "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward" DROP CONSTRAINT "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userJoinEventJoinGameOfEventHistoryId" SET DATA TYPE TEXT,
ALTER COLUMN "rewardId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserJoinEventJoinGameOfEventHistory_Has_ScoreReward_id_seq";

-- AlterTable
ALTER TABLE "UserJoinEventJoinGameOfEvent_Has_TopReward" DROP CONSTRAINT "UserJoinEventJoinGameOfEvent_Has_TopReward_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userJoinEventJoinGameOfEventId" SET DATA TYPE TEXT,
ALTER COLUMN "rewardId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserJoinEventJoinGameOfEvent_Has_TopReward_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserJoinEventJoinGameOfEvent_Has_TopReward_id_seq";

-- AlterTable
ALTER TABLE "UserJoinEventJoinGameOfEvent_History" DROP CONSTRAINT "UserJoinEventJoinGameOfEvent_History_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userJoinEventJoinGameOfEventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserJoinEventJoinGameOfEvent_History_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserJoinEventJoinGameOfEvent_History_id_seq";

-- AlterTable
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" DROP CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userJoinEventId" SET NOT NULL,
ALTER COLUMN "userJoinEventId" SET DATA TYPE TEXT,
ALTER COLUMN "puzzleSet_Of_EventId" SET NOT NULL,
ALTER COLUMN "puzzleSet_Of_EventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserJoinEvent_Exchange_PuzzleSetOfEvent_id_seq";

-- AlterTable
ALTER TABLE "UserJoinEvent_Has_PromotionOfEvent" DROP CONSTRAINT "UserJoinEvent_Has_PromotionOfEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "promotionOfEventId" SET DATA TYPE TEXT,
ALTER COLUMN "userJoinEventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserJoinEvent_Has_PromotionOfEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserJoinEvent_Has_PromotionOfEvent_id_seq";

-- AlterTable
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" DROP CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userJoinEventId" SET DATA TYPE TEXT,
ALTER COLUMN "puzzleOfEventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserJoinEvent_Has_PuzzleOfEvent_id_seq";

-- AlterTable
ALTER TABLE "UserJoinEvent_Join_GameOfEvent" DROP CONSTRAINT "UserJoinEvent_Join_GameOfEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "gameOfEventId" SET DATA TYPE TEXT,
ALTER COLUMN "userJoinEventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserJoinEvent_Join_GameOfEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserJoinEvent_Join_GameOfEvent_id_seq";

-- AlterTable
ALTER TABLE "User_Join_Event" DROP CONSTRAINT "User_Join_Event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_Join_Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_Join_Event_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Reward_rewardId_type_quantity_key" ON "Reward"("rewardId", "type", "quantity");

-- AddForeignKey
ALTER TABLE "User_Join_Event" ADD CONSTRAINT "User_Join_Event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "User_Join_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_puzzleOfEventId_fkey" FOREIGN KEY ("puzzleOfEventId") REFERENCES "Puzzle_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PromotionOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PromotionOfEvent_promotionOfEventId_fkey" FOREIGN KEY ("promotionOfEventId") REFERENCES "Promotion_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PromotionOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PromotionOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "User_Join_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" ADD CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_puzzleSet_Of_Event_fkey" FOREIGN KEY ("puzzleSet_Of_EventId") REFERENCES "PuzzleSet_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" ADD CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "User_Join_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puzzle_Of_Event" ADD CONSTRAINT "Puzzle_Of_Event_puzzleSetOfEventId_fkey" FOREIGN KEY ("puzzleSetOfEventId") REFERENCES "PuzzleSet_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PuzzleSet_Of_Event" ADD CONSTRAINT "PuzzleSet_Of_Event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionOfEvent_Prize_PuzzleSetOfEvent" ADD CONSTRAINT "PromotionOfEvent_Prize_PuzzleSetOfEvent_puzzleSetOfEventId_fkey" FOREIGN KEY ("puzzleSetOfEventId") REFERENCES "PuzzleSet_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionOfEvent_Prize_PuzzleSetOfEvent" ADD CONSTRAINT "PromotionOfEvent_Prize_PuzzleSetOfEvent_promotionOfEventId_fkey" FOREIGN KEY ("promotionOfEventId") REFERENCES "Promotion_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game_Of_Event" ADD CONSTRAINT "Game_Of_Event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion_Of_Event" ADD CONSTRAINT "Promotion_Of_Event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward_RuleFor_GameOfEvent" ADD CONSTRAINT "Reward_RuleFor_GameOfEvent_gameOfEventId_fkey" FOREIGN KEY ("gameOfEventId") REFERENCES "Game_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_rewardRuleForGameOfEventId_fkey" FOREIGN KEY ("rewardRuleForGameOfEventId") REFERENCES "Reward_RuleFor_GameOfEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Join_GameOfEvent" ADD CONSTRAINT "UserJoinEvent_Join_GameOfEvent_gameOfEventId_fkey" FOREIGN KEY ("gameOfEventId") REFERENCES "Game_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
