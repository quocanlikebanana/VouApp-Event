import { Injectable } from "@nestjs/common";
import { ICommand } from "../common/command.handler.i";
import IUnitOfWork from "../common/unit-of-work.i";

export type UserPlayGameParam = {
    userJoinEventId: string,
    gameOfEventId: string,
}

@Injectable()
export default class UserPlayGameCommand implements ICommand<UserPlayGameParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: UserPlayGameParam): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const user = await uow.userRepository.getById(param.userJoinEventId);
            if (!user) {
                throw new Error("User not found");
            }
            const game = await uow.gameRepository.getById(param.gameOfEventId);
            if (!game) {
                throw new Error("Game not found");
            }
            const userJoinGame = user.playGame(game);
            await uow.userRepository.updateJoinGame(user, userJoinGame);
        });
    }
}