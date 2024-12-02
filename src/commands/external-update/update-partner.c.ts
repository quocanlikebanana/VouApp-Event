import { ICommand } from "../common/abstract/command.handler.i";
import { ExternalPartner } from "src/domain/common/types/external.type";
import IUnitOfWork from "../common/abstract/unit-of-work.i";

export default class UpdatePartnerCommand implements ICommand<ExternalPartner, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: ExternalPartner): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            await uow.eventRepository.updateExternal(param);
        });
    }
}