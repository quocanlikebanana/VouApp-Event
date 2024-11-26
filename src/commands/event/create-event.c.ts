import { ICommandHandler } from "src/commands/common/command.handler.i";
import IEventRepository from "src/domain/repositories/event.repository.i";
import { EventEntity } from "src/domain/entities/event/event.entity";
import { Metric, RewardValueType } from "src/domain/common/types/enums";
import IGameRepository from "src/domain/repositories/game.repository.i";
import GameEntity from "src/domain/entities/game/game.entity";
import RewardRuleValueObject from "src/domain/entities/game/reward-rule.vo";
import RewardValueObject from "src/domain/entities/game/reward.vo";
import PuzzleSetEntity from "src/domain/entities/puzzle/puzzleset.entity";
import PuzzleValueObject from "src/domain/entities/puzzle/puzzle.vo";
import PuzzleSetPrizeValueObject from "src/domain/entities/puzzle/puzzle-set-prize.vo";
import IPuzzleSetRepository from "src/domain/repositories/puzzle-set.repository.i";
import PromotionEntity from "src/domain/entities/promotion/promotion.entity";
import IPromotionRepository from "src/domain/repositories/promotion.repository.i";

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

type CreateEventParam = {
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	partner: {
		partnerId: number;
		partnerName: string;
	}
	games: Game[];
	promotions: Promotion[];
	puzzleSets: PuzzleSet[];
}

export default class CreateEventHandler implements ICommandHandler<CreateEventParam, void> {
	constructor(
		private readonly eventRepository: IEventRepository,
		private readonly gameRepository: IGameRepository,
		private readonly puzzleSetRepository: IPuzzleSetRepository,
		private readonly promotionRepository: IPromotionRepository
	) { }

	async execute(param: CreateEventParam): Promise<void> {
		const entity = EventEntity.create({
			name: param.name,
			description: param.description,
			startDate: param.startDate,
			endDate: param.endDate,
			ex_partner: {
				id: param.partner.partnerId,
				name: param.partner.partnerName
			}
		});
		await this.eventRepository.createNew(entity);
		const gameEntities: GameEntity[] = param.games.map(game => {
			return GameEntity.create({
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
		await this.gameRepository.addGames(gameEntities);
		const puzzleSetEntities: PuzzleSetEntity[] = param.puzzleSets.map(puzzleSet => new PuzzleSetEntity({
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
		await this.puzzleSetRepository.addPuzzleSets(puzzleSetEntities);
		const promotionEntities = param.promotions.map(promotion => new PromotionEntity({
			ex_promotion: {
				id: promotion.promotionId,
				name: promotion.promotionName,
				description: promotion.promotionDescription
			},
			quantity: promotion.quantity,
		}));
		await this.promotionRepository.addPromotions(promotionEntities);
	}
}

export { CreateEventParam };