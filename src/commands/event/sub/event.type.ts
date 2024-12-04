import { Metric, RewardValueType } from "src/domain/common/types/enums";

type PuzzleSetPrize = {
    promotionId: string;
    quantity: number;
}

type Puzzle = {
    puzzleId: string;
    puzzleName: string;
}

type PuzzleSet = {
    puzzleSetId: string;
    puzzleSetName: string;
    puzzles: Puzzle[];
    prizes: PuzzleSetPrize[];
}

type Promotion = {
    promotionId: string;
    promotionName: string;
    promotionDescription: string;
    quantity: number;
}

type Reward = {
    rewardId: string;
    type: RewardValueType;
    quantity: number;
}

type RewardRule = {
    metric: Metric;
    threshold: number;
    rewards: Reward[];
}

type Game = {
    gameId: string;
    gamName: string;
    gameDescription: string;
    rewardRule: RewardRule[];
}

export { Game, Promotion, PuzzleSet };