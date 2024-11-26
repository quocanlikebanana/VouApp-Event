import { ICommandHandler } from "src/commands/common/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import IEventRepository from "src/domain/repositories/event.repository.i";
import { CreateEventParam } from "./create-event.c";

type UpdateEventParam = Partial<CreateEventParam> & { id: number };

export default class UpdateEventHandler implements ICommandHandler<Partial<UpdateEventParam>, void> {
    constructor(
        private readonly eventRepository: IEventRepository,

    ) { }

    async execute(param: Partial<UpdateEventParam>): Promise<void> {
        const entity = await this.eventRepository.getById(param.id);
        if (!entity) {
            throw new DomainError('Event not found');
        }
        entity.update(param);
        await this.eventRepository.update(entity);

    }
}

export { UpdateEventParam };