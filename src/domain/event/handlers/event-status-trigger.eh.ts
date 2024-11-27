import { DomainEventHandler } from "src/domain/common/domain-event/domain-event-handler.i";
import IEventRepository from "src/domain/repositories/event.repository.i";
import { EventStatus } from "src/domain/common/types/enums";
import { EventStatusTrigger } from "../events/event-status-trigger.event";

export class EventStatusTriggerEventHandler implements DomainEventHandler<EventStatusTrigger> {
    constructor(
        private readonly eventRepository: IEventRepository
    ) { }

    async handle(event: EventStatusTrigger): Promise<void> {
        await this.eventRepository.updateEventStatus(event.eventId, EventStatus.REJECTED);
    }
}
