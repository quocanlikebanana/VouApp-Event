import { ICommand } from "../common/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import IUnitOfWork from "../common/unit-of-work.i";

export type UserJoinGameParam = {
    userOfEventId: string;
    gameOfEventId: string;
}

export default class UserJoinGameCommand implements ICommand<UserJoinGameParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: UserJoinGameParam): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const user = await uow.userRepository.getById(param.userOfEventId);
            if (!user) {
                throw new DomainError('User not found');
            }
            const game = await uow.gameRepository.getById(param.gameOfEventId);
            if (!game) {
                throw new DomainError('Game not found');
            }
            const userJoinGame = user.joinGame(game);
            await uow.userRepository.addJoinGame(user, userJoinGame);
        });
    }
}