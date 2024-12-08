import GameAggregate from "src/domain/game/game.agg";
import { Game, Promotion, PuzzleSet } from "./event.type";
import RewardRuleValueObject from "src/domain/game/reward-rule.vo";
import RewardEntity from "src/domain/game/reward.entity";
import PuzzleSetAggregate from "src/domain/puzzle/puzzleset.agg";
import PuzzleSetPrizeValueObject from "src/domain/puzzle/puzzle-set-prize.vo";
import PromotionAggregate from "src/domain/promotion/promotion.agg";
import PuzzleEntity from "src/domain/puzzle/puzzle.entity";

export function Games_GameEntities(games: Game[]): GameAggregate[] {
    return games.map(game => {
        return GameAggregate.create({
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
                        return RewardEntity.create({
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

export function PuzzleSets_PuzzleSetEntities(puzzleSets: PuzzleSet[]): PuzzleSetAggregate[] {
    return puzzleSets.map(puzzleSet => PuzzleSetAggregate.create({
        ex_puzzleSet: {
            id: puzzleSet.puzzleSetId,
            name: puzzleSet.puzzleSetName
        },
        puzzles: puzzleSet.puzzles.map(puzzle => PuzzleEntity.create({
            ex: {
                id: puzzle.puzzleId,
                name: puzzle.puzzleName,
                puzzleSetId: puzzleSet.puzzleSetId
            },
            puzzleSetId: puzzleSet.puzzleSetId
        })),
        puzzleSetPrize: puzzleSet.prizes.map(prize => new PuzzleSetPrizeValueObject({
            quantity: prize.quantity,
            promotionOfEventId: prize.promotionId
        }))
    }));
}

export function Promotions_PromotionEntities(promotions: Promotion[]): PromotionAggregate[] {
    return promotions.map(promotion => PromotionAggregate.create({
        ex_promotion: {
            id: promotion.promotionId,
            name: promotion.promotionName,
            description: promotion.promotionDescription
        },
        quantityUseInEvent: promotion.quantity
    }));
}