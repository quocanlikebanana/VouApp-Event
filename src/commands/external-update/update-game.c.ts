import IGameRepository from "src/domain/common/repositories/game.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import { ExternalGame } from "src/domain/common/types/external.type";

export default class UpdateGameCommand implements ICommand<ExternalGame, void> {
    constructor(
        private readonly gameRepository: IGameRepository,
    ) { }

    async execute(param: ExternalGame): Promise<void> {
        await this.gameRepository.updateExternal(param);
    }
}