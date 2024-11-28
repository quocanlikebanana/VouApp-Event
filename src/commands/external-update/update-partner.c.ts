import IEventRepository from "src/domain/common/repositories/event.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import { ExternalPartner } from "src/domain/common/types/external.type";

export default class UpdatePartnerCommand implements ICommand<ExternalPartner, void> {
    constructor(
        private readonly eventRepository: IEventRepository,
    ) { }

    async execute(param: ExternalPartner): Promise<void> {
        await this.eventRepository.updateExternal(param);
    }
}