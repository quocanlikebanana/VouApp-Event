import { DomainEventHandler } from "src/domain/common/domain-event/domain-event-handler.i";
import IEventRepository from "src/domain/repositories/event.repository.i";
import { EventStatus } from "src/domain/common/types/enums";
import { PendingOutdatedEvent } from "../events/pending-outdated.event";


export class PendingOutdatedEventHandler implements DomainEventHandler<PendingOutdatedEvent> {
    constructor(
        private readonly eventRepository: IEventRepository
    ) { }

    async handle(event: PendingOutdatedEvent): Promise<void> {
        await this.eventRepository.updateEventStatus(event.eventId, EventStatus.REJECTED);
    }
}
