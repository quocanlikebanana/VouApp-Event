import { ICommand } from "src/commands/common/abstract/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import { CreateEventParam } from "./create-event.c";
import { Games_GameEntities, Promotions_PromotionEntities, PuzzleSets_PuzzleSetEntities } from "../common/converter/event-content.conv";
import IEventRepository from "src/domain/common/repositories/event.repository.i";
import IGameRepository from "src/domain/common/repositories/game.repository.i";
import IPuzzleSetRepository from "src/domain/common/repositories/puzzle-set.repository.i";
import IPromotionRepository from "src/domain/common/repositories/promotion.repository.i";

export type UpdateEventParam = Partial<CreateEventParam> & { id: number };

export default class UpdateEventCommand implements ICommand<Partial<UpdateEventParam>, void> {
    constructor(
        private readonly eventRepository: IEventRepository,
        private readonly gameRepository: IGameRepository,
        private readonly puzzleSetRepository: IPuzzleSetRepository,
        private readonly promotionRepository: IPromotionRepository
    ) { }

    async execute(param: Partial<UpdateEventParam>): Promise<void> {
        const entity = await this.eventRepository.getById(param.id);
        if (!entity) {
            throw new DomainError('Event not found');
        }
        entity.update(param);
        await this.eventRepository.update(entity);
        if (param.games) {
            await this.gameRepository.removeGamesOfEvent(entity);
            const gameEntities = Games_GameEntities(param.games);
            await this.gameRepository.addGames(gameEntities);
        }
        if (param.puzzleSets) {
            await this.puzzleSetRepository.removePuzzleSetsOfEvent(entity);
            const puzzleSetEntities = PuzzleSets_PuzzleSetEntities(param.puzzleSets);
            await this.puzzleSetRepository.addPuzzleSets(puzzleSetEntities);
        }
        if (param.promotions) {
            await this.promotionRepository.removePromotionsOfEvent(entity);
            const promotionEntities = Promotions_PromotionEntities(param.promotions);
            await this.promotionRepository.addPromotions(promotionEntities);
        }
    }
}