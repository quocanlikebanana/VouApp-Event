import { Injectable } from "@nestjs/common";
import { ICommand } from "../common/command.handler.i";
import IUnitOfWork from "../common/unit-of-work.i";

export type UserLeaveEventParam = {
    userJoinEventId: string
}

@Injectable()
export default class UserLeaveEventCommand implements ICommand<UserLeaveEventParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: UserLeaveEventParam): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const user = await uow.userRepository.getById(param.userJoinEventId);
            await uow.userRepository.remove(user);
        });
    }
}