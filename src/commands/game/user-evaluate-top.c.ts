import { Injectable } from "@nestjs/common";
import { ICommand } from "../common/command.handler.i";
import IUnitOfWork from "../common/unit-of-work.i";

export type UserEvaluateTopParam = {
    userJoinEventId: string;
    gameOfEventId: string;
}

@Injectable()
export default class UserEvaluateTopCommand implements ICommand<UserEvaluateTopParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: UserEvaluateTopParam): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const user = await uow.userRepository.getById(param.userJoinEventId);
            if (!user) {
                throw new Error("User not found");
            }
            const game = await uow.gameRepository.getById(param.gameOfEventId);
            if (!game) {
                throw new Error("Game not found");
            }
            const userTop = await uow.gameRepository.getUserTop(user.id, game.id);
            const userJoinGame = user.saveTopForGame(game, userTop);
            await uow.userRepository.updateJoinGame(user, userJoinGame);
        });
    }
}