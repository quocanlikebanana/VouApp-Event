import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import IGameRepository from "src/domain/common/repositories/game.repository.i";

export type UserEvaluateScoreParam = {
    userJoinEventId: number;
    gameOfEventId: number;
    score: number;
}

export default class UserEvaluateScoreCommand implements ICommand<UserEvaluateScoreParam, void> {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly gameRepo: IGameRepository,
    ) { }

    async execute(param: UserEvaluateScoreParam): Promise<void> {
        const user = await this.userRepo.getById(param.userJoinEventId);
        if (!user) {
            throw new Error("User not found");
        }
        const game = await this.gameRepo.getById(param.gameOfEventId);
        if (!game) {
            throw new Error("Game not found");
        }
        const history = user.saveGameScore(game, param.score);
        await this.userRepo.addJoinGameHistory(user, history);
    }
}