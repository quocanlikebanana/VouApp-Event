import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import IGameRepository from "src/domain/common/repositories/game.repository.i";

export type UserPlayGameParam = {
    userJoinEventId: number,
    gameOfEventId: number,
}

export default class UserPlayGameCommand implements ICommand<UserPlayGameParam, void> {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly gameRepo: IGameRepository,
    ) { }

    async execute(param: UserPlayGameParam): Promise<void> {
        const user = await this.userRepo.getById(param.userJoinEventId);
        if (!user) {
            throw new Error("User not found");
        }
        const game = await this.gameRepo.getById(param.gameOfEventId);
        if (!game) {
            throw new Error("Game not found");
        }
        const userJoinGame = user.playGame(game);
        await this.userRepo.updateJoinGame(user, userJoinGame);
    }
}