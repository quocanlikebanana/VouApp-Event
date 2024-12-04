import { ICommand } from "../common/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import IUnitOfWork from "../common/unit-of-work.i";

export type UserGiveTurnParam = {
    userOfEventId_Give: string;
    userOfEventId_Take: string;
    gameOfEventId: string;
    turn: number;
}

export default class UserGiveTurnCommand implements ICommand<UserGiveTurnParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: UserGiveTurnParam): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const userGive = await uow.userRepository.getById(param.userOfEventId_Give);
            if (!userGive) {
                throw new DomainError('User to give turns not found');
            }
            const userTake = await uow.userRepository.getById(param.userOfEventId_Take);
            if (!userTake) {
                throw new DomainError('User to take turns not found');
            }
            const game = await uow.gameRepository.getById(param.gameOfEventId);
            if (!game) {
                throw new DomainError('Game not found');
            }
            const givenTurnGame = userGive.giveTurn(game, param.turn);
            const takenTurnGame = userTake.takeTurn(game, param.turn);
            await uow.userRepository.updateJoinGame(userGive, givenTurnGame);
            await uow.userRepository.updateJoinGame(userTake, takenTurnGame);
        });
    }
}