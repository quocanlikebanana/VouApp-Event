import { ICommandHandler } from "src/commands/common/abstract/command.handler.i";
import IEventRepository from "src/domain/repositories/event.repository.i";
import { EventEntity } from "src/domain/entities/event/event.entity";
import IGameRepository from "src/domain/repositories/game.repository.i";
import GameEntity from "src/domain/entities/game/game.entity";
import PuzzleSetEntity from "src/domain/entities/puzzle/puzzleset.entity";
import IPuzzleSetRepository from "src/domain/repositories/puzzle-set.repository.i";
import IPromotionRepository from "src/domain/repositories/promotion.repository.i";
import { Game, Promotion, PuzzleSet } from "../common/types/event.type";
import { Games_GameEntities, Promotions_PromotionEntities, PuzzleSets_PuzzleSetEntities } from "../common/converter/event-content.conv";

export type CreateEventParam = {
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
		const gameEntities: GameEntity[] = Games_GameEntities(param.games);
		await this.gameRepository.addGames(gameEntities);
		const puzzleSetEntities: PuzzleSetEntity[] = PuzzleSets_PuzzleSetEntities(param.puzzleSets);
		await this.puzzleSetRepository.addPuzzleSets(puzzleSetEntities);
		const promotionEntities = Promotions_PromotionEntities(param.promotions);
		await this.promotionRepository.addPromotions(promotionEntities);
	}
}