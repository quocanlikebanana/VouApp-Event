import { ICommandHandler } from "src/commands/common/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import IEventRepository from "src/domain/repositories/event.repository.i";

type UpdateEventParam = {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;

    // Todo: update on games, promotions, and puzzles
}

export default class UpdateEventHandler implements ICommandHandler<Partial<UpdateEventParam>, void> {
    constructor(
        private readonly eventRepository: IEventRepository
    ) { }

    async execute(param: Partial<UpdateEventParam>): Promise<void> {
        const entity = await this.eventRepository.getById(param.id);
        if (!entity) {
            throw new DomainError('Event not found');
        }
        const newEntity = entity.recreate(param);
        await this.eventRepository.updateById(newEntity);
    }
}