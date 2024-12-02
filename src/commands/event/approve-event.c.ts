import { ICommand } from "src/commands/common/abstract/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import IEventRepository from "src/domain/common/repositories/event.repository.i";

export type ApproveEventParam = {
    id: number;
}

export default class ApproveEventCommand implements ICommand<ApproveEventParam, void> {
    constructor(
        private readonly eventRepository: IEventRepository
    ) { }

    async execute(param: ApproveEventParam): Promise<void> {
        const entity = await this.eventRepository.getById(param.id);
        if (!entity) {
            throw new DomainError('Event not found');
        }
        entity.approve();
        await this.eventRepository.update(entity);
    }
}