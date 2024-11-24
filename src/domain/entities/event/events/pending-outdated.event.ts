import { DomainEventBase } from "src/domain/common/domain-event/domain-event.base";

export class PendingOutdatedEvent extends DomainEventBase {
    constructor(
        public readonly eventId: number
    ) {
        super();
    }
}
