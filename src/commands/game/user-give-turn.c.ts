import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import IGameRepository from "src/domain/common/repositories/game.repository.i";

export type UserGiveTurnParam = {
    userOfEventId_Give: number;
    userOfEventId_Take: number;
    gameOfEventId: number;
    turn: number;
}

export default class UserGiveTurnCommand implements ICommand<UserGiveTurnParam, void> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly gameRepository: IGameRepository,
    ) { }

    async execute(param: UserGiveTurnParam): Promise<void> {
        const userGive = await this.userRepository.getById(param.userOfEventId_Give);
        if (!userGive) {
            throw new DomainError('User to give turns not found');
        }
        const userTake = await this.userRepository.getById(param.userOfEventId_Take);
        if (!userTake) {
            throw new DomainError('User to take turns not found');
        }
        const game = await this.gameRepository.getById(param.gameOfEventId);
        if (!game) {
            throw new DomainError('Game not found');
        }
        const givenTurnGame = userGive.giveTurn(game, param.turn);
        const takenTurnGame = userTake.takeTurn(game, param.turn);
        await this.userRepository.updateJoinGame(userGive, givenTurnGame);
        await this.userRepository.updateJoinGame(userTake, takenTurnGame);
    }
}