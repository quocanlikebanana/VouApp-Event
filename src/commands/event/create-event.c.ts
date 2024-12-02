import { ICommand } from "src/commands/common/abstract/command.handler.i";
import { EventAggregate } from "src/domain/event/event.agg";
import GameAggregate from "src/domain/game/game.agg";
import PuzzleSetAggregate from "src/domain/puzzle/puzzleset.agg";
import { Game, Promotion, PuzzleSet } from "../common/types/event.type";
import { Games_GameEntities, Promotions_PromotionEntities, PuzzleSets_PuzzleSetEntities } from "../common/converter/event-content.conv";
import IUnitOfWork from "../common/abstract/unit-of-work.i";

export type CreateEventParam = {
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	partner: {
		partnerId: string;
		partnerName: string;
	}
	games: Game[];
	promotions: Promotion[];
	puzzleSets: PuzzleSet[];
}

export default class CreateEventCommand implements ICommand<CreateEventParam, void> {
	constructor(
		private readonly unitOfWork: IUnitOfWork,
	) { }

	async execute(param: CreateEventParam): Promise<void> {
		await this.unitOfWork.execute(async (uow) => {
			const event = EventAggregate.create({
				name: param.name,
				description: param.description,
				startDate: param.startDate,
				endDate: param.endDate,
				ex_partner: {
					id: param.partner.partnerId,
					name: param.partner.partnerName
				}
			});
			await uow.eventRepository.createNew(event);
			const gameEntities: GameAggregate[] = Games_GameEntities(param.games);
			await uow.gameRepository.addGamesOfEvent(event, gameEntities);
			const puzzleSetEntities: PuzzleSetAggregate[] = PuzzleSets_PuzzleSetEntities(param.puzzleSets);
			await uow.puzzleSetRepository.addPuzzleSetsOfEvent(event, puzzleSetEntities);
			const promotionEntities = Promotions_PromotionEntities(param.promotions);
			await uow.promotionRepository.addPromotionsOfEvent(event, promotionEntities);
		});
	}
}