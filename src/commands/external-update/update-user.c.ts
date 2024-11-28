import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import { ExternalUser } from "src/domain/common/types/external.type";

export default class UpdateUserCommand implements ICommand<ExternalUser, void> {
    constructor(
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(param: ExternalUser): Promise<void> {
        await this.userRepository.updateExternal(param);
    }
}
