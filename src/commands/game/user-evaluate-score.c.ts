import { Injectable } from "@nestjs/common";
import { ICommand } from "../common/command.handler.i";
import IUnitOfWork from "../common/unit-of-work.i";

export type UserEvaluateScoreParam = {
    userJoinEventId: string;
    gameOfEventId: string;
    score: number;
}

@Injectable()
export default class UserEvaluateScoreCommand implements ICommand<UserEvaluateScoreParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork,
    ) { }

    async execute(param: UserEvaluateScoreParam): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const user = await uow.userRepository.getById(param.userJoinEventId);
            if (!user) {
                throw new Error("User not found");
            }
            const game = await uow.gameRepository.getById(param.gameOfEventId);
            if (!game) {
                throw new Error("Game not found");
            }
            const history = user.saveScoreForGame(game, param.score);
            await uow.userRepository.addJoinGameHistory(user, history);
        });
    }
}