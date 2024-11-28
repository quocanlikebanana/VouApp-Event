import { DomainEventBase } from "src/domain/common/domain-event/domain-event.base";
import { EventAggregate } from "../event.agg";

export class EventStatusUpdateEvent extends DomainEventBase {
    constructor(
        public readonly event: EventAggregate,
    ) {
        super();
    }
}
