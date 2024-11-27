import { ICommand } from "src/commands/common/abstract/command.handler.i";
import { EventEntity } from "src/domain/event/event.entity";
import GameEntity from "src/domain/game/game.entity";
import PuzzleSetEntity from "src/domain/puzzle/puzzleset.entity";
import { Game, Promotion, PuzzleSet } from "../common/types/event.type";
import { Games_GameEntities, Promotions_PromotionEntities, PuzzleSets_PuzzleSetEntities } from "../common/converter/event-content.conv";
import IEventRepository from "src/domain/common/repositories/event.repository.i";
import IGameRepository from "src/domain/common/repositories/game.repository.i";
import IPuzzleSetRepository from "src/domain/common/repositories/puzzle-set.repository.i";
import IPromotionRepository from "src/domain/common/repositories/promotion.repository.i";

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

export default class CreateEventCommand implements ICommand<CreateEventParam, void> {
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