import { ICommandHandler } from "src/commands/common/command.handler.i";
import IEventRepository from "src/domain/contracts/repositories/event.repository.i";
import { EventEntity } from "src/domain/entities/envent.entity";

type CreateEventParam = {
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	partner: {
		partnerId: number;
		partnerName: string;
	}
}

export default class CreateEventHandler implements ICommandHandler<CreateEventParam, void> {
	constructor(
		private readonly eventRepository: IEventRepository
	) { }

	async execute(param: CreateEventParam): Promise<void> {
		const event = { ...param, eventStatus: "PENDING" as "PENDING" };
		const entity = new EventEntity(event);
		await this.eventRepository.createNew(entity);
	}
}