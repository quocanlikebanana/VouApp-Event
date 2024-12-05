import { ICommand } from "../common/command.handler.i";
import { ExternalUser } from "src/domain/common/types/external.type";
import IUnitOfWork from "../common/unit-of-work.i";
import { Injectable } from "@nestjs/common";

@Injectable()
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
