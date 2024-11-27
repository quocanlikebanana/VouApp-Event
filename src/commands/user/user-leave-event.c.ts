import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";

export type UserLeaveEventParam = {
    userJoinEventId: number
}

export default class UserLeaveEventCommand implements ICommand<UserLeaveEventParam, void> {
    constructor(
        private readonly userRepository: IUserRepository
    ) { }

    async execute(param: UserLeaveEventParam): Promise<void> {
        const user = await this.userRepository.getById(param.userJoinEventId);
        await this.userRepository.remove(user);
    }
}