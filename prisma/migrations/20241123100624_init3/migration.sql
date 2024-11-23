/*
  Warnings:

  - The values [HIGHSCORE] on the enum `Metric` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date` on the `UserJoinEvent_Exchange_PuzzleSetOfEvent` table. All the data in the column will be lost.
  - Added the required column `joinDate` to the `UserJoinEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchangeDate` to the `UserJoinEvent_Exchange_PuzzleSetOfEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Metric_new" AS ENUM ('TOP', 'RANK', 'SCORE');
ALTER TABLE "Reward_RuleFor_GameOfEvent" ALTER COLUMN "metric" TYPE "Metric_new" USING ("metric"::text::"Metric_new");
ALTER TYPE "Metric" RENAME TO "Metric_old";
ALTER TYPE "Metric_new" RENAME TO "Metric";
DROP TYPE "Metric_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserJoinEvent" ADD COLUMN     "joinDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserJoinEvent_Exchange_PuzzleSetOfEvent" DROP COLUMN "date",
ADD COLUMN     "exchangeDate" TIMESTAMP(3) NOT NULL;
