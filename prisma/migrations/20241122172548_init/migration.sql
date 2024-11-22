-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'STARTED', 'ENDED');

-- CreateEnum
CREATE TYPE "Metric" AS ENUM ('TOP', 'HIGHSCORE');

-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('PROMOTION', 'PUZZLE');

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "partnerName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "EventStatus" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJoinEvent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userFacebook" TEXT,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "UserJoinEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJoinEvent_Has_PuzzleOfEvent" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userJoinEventId" INTEGER NOT NULL,
    "puzzleOfEventId" INTEGER NOT NULL,

    CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userJoinEventId" INTEGER NOT NULL,
    "puzzleSetOfEventId" INTEGER NOT NULL,

    CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Puzzle_Of_Event" (
    "puzzleId" INTEGER NOT NULL,
    "puzzleName" TEXT NOT NULL,
    "puzzleSetOfEventId" INTEGER NOT NULL,

    CONSTRAINT "Puzzle_Of_Event_pkey" PRIMARY KEY ("puzzleId")
);

-- CreateTable
CREATE TABLE "PuzzleSet_Of_Event" (
    "id" SERIAL NOT NULL,
    "possibility" DOUBLE PRECISION NOT NULL,
    "puzzleSetId" INTEGER NOT NULL,
    "puzzleSetName" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "PuzzleSet_Of_Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionOfEvent_For_PuzzleSetOfEvent" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "puzzleSetOfEventId" INTEGER NOT NULL,
    "promotionOfEventId" INTEGER NOT NULL,

    CONSTRAINT "PromotionOfEvent_For_PuzzleSetOfEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game_Of_Event" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "gameName" TEXT NOT NULL,
    "gameDescription" TEXT,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Game_Of_Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion_Of_Event" (
    "id" SERIAL NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "promotionName" TEXT NOT NULL,
    "promotionDescription" TEXT,
    "quantity" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Promotion_Of_Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward_RuleFor_GameOfEvent" (
    "id" SERIAL NOT NULL,
    "metric" "Metric" NOT NULL,
    "threshold" INTEGER NOT NULL,
    "possibility" DOUBLE PRECISION NOT NULL,
    "gameOfEventId" INTEGER NOT NULL,
    "rewardId" INTEGER NOT NULL,

    CONSTRAINT "Reward_RuleFor_GameOfEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" "RewardType" NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJoinEvent_Join_GameOfEvent" (
    "id" SERIAL NOT NULL,
    "turn" INTEGER NOT NULL,
    "gameOfEventId" INTEGER NOT NULL,
    "userJoinEventId" INTEGER NOT NULL,

    CONSTRAINT "UserJoinEvent_Join_GameOfEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "stats" JSONB NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rewardId" INTEGER,
    "userJoinEventJoinGameOfEventId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserJoinEvent_userId_eventId_key" ON "UserJoinEvent"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "UserJoinEvent_Has_PuzzleOfEvent_userJoinEventId_puzzleOfEve_key" ON "UserJoinEvent_Has_PuzzleOfEvent"("userJoinEventId", "puzzleOfEventId");

-- CreateIndex
CREATE UNIQUE INDEX "PuzzleSet_Of_Event_puzzleSetId_eventId_key" ON "PuzzleSet_Of_Event"("puzzleSetId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionOfEvent_For_PuzzleSetOfEvent_puzzleSetOfEventId_pr_key" ON "PromotionOfEvent_For_PuzzleSetOfEvent"("puzzleSetOfEventId", "promotionOfEventId");

-- CreateIndex
CREATE UNIQUE INDEX "UserJoinEvent_Join_GameOfEvent_gameOfEventId_userJoinEventI_key" ON "UserJoinEvent_Join_GameOfEvent"("gameOfEventId", "userJoinEventId");

-- AddForeignKey
ALTER TABLE "UserJoinEvent" ADD CONSTRAINT "UserJoinEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "UserJoinEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Has_PuzzleOfEvent" ADD CONSTRAINT "UserJoinEvent_Has_PuzzleOfEvent_puzzleOfEventId_fkey" FOREIGN KEY ("puzzleOfEventId") REFERENCES "Puzzle_Of_Event"("puzzleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" ADD CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "UserJoinEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" ADD CONSTRAINT "UserJoinEvent_Exchange_PuzzleSetOfEvent_puzzleSetOfEventId_fkey" FOREIGN KEY ("puzzleSetOfEventId") REFERENCES "PuzzleSet_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puzzle_Of_Event" ADD CONSTRAINT "Puzzle_Of_Event_puzzleSetOfEventId_fkey" FOREIGN KEY ("puzzleSetOfEventId") REFERENCES "PuzzleSet_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PuzzleSet_Of_Event" ADD CONSTRAINT "PuzzleSet_Of_Event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionOfEvent_For_PuzzleSetOfEvent" ADD CONSTRAINT "PromotionOfEvent_For_PuzzleSetOfEvent_puzzleSetOfEventId_fkey" FOREIGN KEY ("puzzleSetOfEventId") REFERENCES "PuzzleSet_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionOfEvent_For_PuzzleSetOfEvent" ADD CONSTRAINT "PromotionOfEvent_For_PuzzleSetOfEvent_promotionOfEventId_fkey" FOREIGN KEY ("promotionOfEventId") REFERENCES "Promotion_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game_Of_Event" ADD CONSTRAINT "Game_Of_Event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion_Of_Event" ADD CONSTRAINT "Promotion_Of_Event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward_RuleFor_GameOfEvent" ADD CONSTRAINT "Reward_RuleFor_GameOfEvent_gameOfEventId_fkey" FOREIGN KEY ("gameOfEventId") REFERENCES "Game_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward_RuleFor_GameOfEvent" ADD CONSTRAINT "Reward_RuleFor_GameOfEvent_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Join_GameOfEvent" ADD CONSTRAINT "UserJoinEvent_Join_GameOfEvent_gameOfEventId_fkey" FOREIGN KEY ("gameOfEventId") REFERENCES "Game_Of_Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinEvent_Join_GameOfEvent" ADD CONSTRAINT "UserJoinEvent_Join_GameOfEvent_userJoinEventId_fkey" FOREIGN KEY ("userJoinEventId") REFERENCES "UserJoinEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userJoinEventJoinGameOfEventId_fkey" FOREIGN KEY ("userJoinEventJoinGameOfEventId") REFERENCES "UserJoinEvent_Join_GameOfEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
