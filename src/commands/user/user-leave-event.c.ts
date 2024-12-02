import { ICommand } from "../common/abstract/command.handler.i";
import IUnitOfWork from "../common/abstract/unit-of-work.i";

export type UserLeaveEventParam = {
    userJoinEventId: string
}

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