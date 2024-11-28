import { DomainEventHandler } from "src/domain/common/domain-event/domain-event-handler.i";
import { EventStatus } from "src/domain/common/types/enums";
import { EventStatusTrigger } from "../events/event-status-trigger.event";
import IEventRepository from "src/domain/common/repositories/event.repository.i";

export class EventStatusTriggerEventHandler implements DomainEventHandler<EventStatusTrigger> {
    constructor(
        private readonly eventRepository: IEventRepository
    ) { }

    async handle(event: EventStatusTrigger): Promise<void> {
        await this.eventRepository.updateEventStatus(event);
    }
}
