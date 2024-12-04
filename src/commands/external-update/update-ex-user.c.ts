import { ICommand } from "../common/abstract/command.handler.i";
import { ExternalUser } from "src/domain/common/types/external.type";
import IUnitOfWork from "../common/abstract/unit-of-work.i";

export default class UpdateExUserCommand implements ICommand<ExternalUser, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: ExternalUser): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            await uow.userRepository.updateExternal(param);
        });
    }
}
