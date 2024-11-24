import { DomainEventBase } from "./domain-event.base";

export interface DomainEventHandler<T extends DomainEventBase> {
    handle(event: T): void;
}