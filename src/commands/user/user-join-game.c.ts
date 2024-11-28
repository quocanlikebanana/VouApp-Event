import IGameRepository from "src/domain/common/repositories/game.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { DomainError } from "src/domain/common/errors/domain.err";

export type UserJoinGameParam = {
    userOfEventId: number;
    gameOfEventId: number;
}

export default class UserJoinGameCommand implements ICommand<UserJoinGameParam, void> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly gameRepository: IGameRepository,
    ) { }

    async execute(param: UserJoinGameParam): Promise<void> {
        const user = await this.userRepository.getById(param.userOfEventId);
        if (!user) {
            throw new DomainError('User not found');
        }
        const game = await this.gameRepository.getById(param.gameOfEventId);
        if (!game) {
            throw new DomainError('Game not found');
        }
        const userJoinGame = user.joinGame(game);
        await this.userRepository.addJoinGame(user, userJoinGame);
    }
}