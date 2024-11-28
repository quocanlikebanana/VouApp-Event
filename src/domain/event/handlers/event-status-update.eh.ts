import { DomainEventHandler } from "src/domain/common/domain-event/domain-event-handler.i";
import { EventStatusUpdateEvent } from "../events/event-status-update.event";
import IEventRepository from "src/domain/common/repositories/event.repository.i";

export class EventStatusUpdateEventHandler implements DomainEventHandler<EventStatusUpdateEvent> {
    constructor(
        private readonly eventRepository: IEventRepository
    ) { }

    async handle(event: EventStatusUpdateEvent): Promise<void> {
        await this.eventRepository.updateEventStatus(event.event);
    }
}
