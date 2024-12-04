import { ICommand } from "src/commands/common/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import { CreateEventParam } from "./create-event.c";
import { Games_GameEntities, Promotions_PromotionEntities, PuzzleSets_PuzzleSetEntities } from "./sub/event-content.conv";
import IUnitOfWork from "../common/unit-of-work.i";

export type UpdateEventParam = Partial<CreateEventParam> & { id: string };

export default class UpdateEventCommand implements ICommand<Partial<UpdateEventParam>, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork,
    ) { }

    async execute(param: Partial<UpdateEventParam>): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const event = await uow.eventRepository.getById(param.id);
            if (!event) {
                throw new DomainError('Event not found');
            }
            event.update(param);
            await uow.eventRepository.update(event);
            if (param.games) {
                await uow.gameRepository.removeGamesOfEvent(event);
                const gameEntities = Games_GameEntities(param.games);
                await uow.gameRepository.addGamesOfEvent(event, gameEntities);
            }
            if (param.puzzleSets) {
                await uow.puzzleSetRepository.removePuzzleSetsOfEvent(event);
                const puzzleSetEntities = PuzzleSets_PuzzleSetEntities(param.puzzleSets);
                await uow.puzzleSetRepository.addPuzzleSetsOfEvent(event, puzzleSetEntities);
            }
            if (param.promotions) {
                await uow.promotionRepository.removePromotionsOfEvent(event);
                const promotionEntities = Promotions_PromotionEntities(param.promotions);
                await uow.promotionRepository.addPromotionsOfEvent(event, promotionEntities);
            }
        });
    }
}