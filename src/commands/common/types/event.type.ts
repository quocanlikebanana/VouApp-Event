import { Metric, RewardValueType } from "src/domain/common/types/enums";

type PuzzleSetPrize = {
    promotionId: number;
    quantity: number;
}

type Puzzle = {
    puzzleId: number;
    puzzleName: string;
}

type PuzzleSet = {
    puzzleSetId: number;
    puzzleSetName: string;
    puzzles: Puzzle[];
    prizes: PuzzleSetPrize[];
}

type Promotion = {
    promotionId: number;
    promotionName: string;
    promotionDescription: string;
    quantity: number;
}

type Reward = {
    rewardId: number;
    type: RewardValueType;
    quantity: number;
}

type RewardRule = {
    metric: Metric;
    threshold: number;
    rewards: Reward[];
}

type Game = {
    gameId: number;
    gamName: string;
    gameDescription: string;
    rewardRule: RewardRule[];
}

export { Game, Promotion, PuzzleSet };