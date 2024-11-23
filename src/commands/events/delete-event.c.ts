import { ICommandHandler } from "src/commands/common/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import IEventRepository from "src/domain/contracts/repositories/event.repository.i";
import { EventEntity } from "src/domain/entities/envent.entity";

type UpdateEventParam = {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    partner: {
        partnerId: number;
        partnerName: string;
    }
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
        const newEntity = entity.updateNew(param);
        await this.eventRepository.updateById(newEntity);
    }
}