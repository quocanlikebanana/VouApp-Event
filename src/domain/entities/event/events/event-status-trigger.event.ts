import { DomainEventBase } from "src/domain/common/domain-event/domain-event.base";
import { EventStatus } from "src/domain/common/types/enums";

export class EventStatusTrigger extends DomainEventBase {
    constructor(
        public readonly eventId: number,
        public readonly eventStatus: EventStatus
    ) {
        super();
    }
}
