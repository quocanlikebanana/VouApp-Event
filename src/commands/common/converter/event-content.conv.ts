import GameEntity from "src/domain/game/game.entity";
import { Game, Promotion, PuzzleSet } from "../types/event.type";
import RewardRuleValueObject from "src/domain/game/reward-rule.vo";
import RewardValueObject from "src/domain/game/reward.vo";
import PuzzleSetEntity from "src/domain/puzzle/puzzleset.entity";
import PuzzleValueObject from "src/domain/puzzle/puzzle.vo";
import PuzzleSetPrizeValueObject from "src/domain/puzzle/puzzle-set-prize.vo";
import PromotionEntity from "src/domain/promotion/promotion.entity";

export function Games_GameEntities(games: Game[]): GameEntity[] {
    return games.map(game => {
        return new GameEntity({
            ex_game: {
                id: game.gameId,
                name: game.gamName,
                description: game.gameDescription
            },
            rewardRules: game.rewardRule.map(rule => {
                return new RewardRuleValueObject({
                    metric: rule.metric,
                    threshold: rule.threshold,
                    rewards: rule.rewards.map(reward => {
                        return new RewardValueObject({
                            rewardId: reward.rewardId,
                            type: reward.type,
                            quantity: reward.quantity
                        });
                    })
                });
            })
        });
    });
}

export function PuzzleSets_PuzzleSetEntities(puzzleSets: PuzzleSet[]): PuzzleSetEntity[] {
    return puzzleSets.map(puzzleSet => new PuzzleSetEntity({
        ex_puzzleSet: {
            id: puzzleSet.puzzleSetId,
            name: puzzleSet.puzzleSetName
        },
        puzzles: puzzleSet.puzzles.map(puzzle => new PuzzleValueObject({
            ex_id: puzzle.puzzleId,
            ex_name: puzzle.puzzleName,
        })),
        puzzleSetPrize: puzzleSet.prizes.map(prize => new PuzzleSetPrizeValueObject({
            quantity: prize.quantity,
            promotionId: prize.promotionId
        }))
    }));
}

export function Promotions_PromotionEntities(promotions: Promotion[]): PromotionEntity[] {
    return promotions.map(promotion => new PromotionEntity({
        ex_promotion: {
            id: promotion.promotionId,
            name: promotion.promotionName,
            description: promotion.promotionDescription
        },
        quantity: promotion.quantity
    }));
}