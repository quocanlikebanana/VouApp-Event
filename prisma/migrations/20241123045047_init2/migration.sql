/*
  Warnings:

  - The primary key for the `Puzzle_Of_Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[order,userJoinEventJoinGameOfEventId]` on the table `History` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[puzzleId,puzzleSetOfEventId]` on the table `Puzzle_Of_Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[promotionOrPuzzleId,type,quantity]` on the table `Reward` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promotionOrPuzzleId` to the `Reward` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" DROP CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_puzzleOfEventId_fkey";

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Puzzle_Of_Event" DROP CONSTRAINT "Puzzle_Of_Event_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Puzzle_Of_Event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "promotionOrPuzzleId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "History_order_userJoinEventJoinGameOfEventId_key" ON "History"("order", "userJoinEventJoinGameOfEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_Of_Event_puzzleId_puzzleSetOfEventId_key" ON "Puzzle_Of_Event"("puzzleId", "puzzleSetOfEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_promotionOrPuzzleId_type_quantity_key" ON "Reward"("promotionOrPuzzleId", "type", "quantity");

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_puzzleOfEventId_fkey" FOREIGN KEY ("puzzleOfEventId") REFERENCES "Puzzle_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
