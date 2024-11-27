import { ICommandHandler } from "src/commands/common/abstract/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import IEventRepository from "src/domain/repositories/event.repository.i";

type DeleteEventParam = {
    id: number;
}

export default class DeleteEventHandler implements ICommandHandler<DeleteEventParam, void> {
    constructor(
        private readonly eventRepository: IEventRepository
    ) { }

    async execute(param: DeleteEventParam): Promise<void> {
        const entity = await this.eventRepository.getById(param.id);
        if (!entity) {
            throw new DomainError('Event not found');
        }
        entity.checkDeleteable();
        await this.eventRepository.deleteById(param.id);
    }
}