import { DomainEventDispatcher } from "../domain-event/domain-event-dispatcher";
import { DomainEventBase } from "../domain-event/domain-event.base";
import { Entity } from "./entity.a";

export default abstract class AggregateRoot<T> extends Entity<T> {
    private readonly domainEvents: DomainEventBase[];

    protected constructor(props: T, id: number = null) {
        super(props, id);
        this.domainEvents = [];
    }

    // 1. Events that don't persist to the database
    // 2. Events that must happens no matter what (e.g. scheduled tasks)
    protected immidiateDispatch(event: DomainEventBase): void {
        DomainEventDispatcher.dispatch(event);
    }

    protected addDomainEvent(event: DomainEventBase): void {
        this.domainEvents.push(event);
    }

    getEvents(): DomainEventBase[] {
        return this.domainEvents;
    }

    clearEvents(): void {
        this.domainEvents.splice(0, this.domainEvents.length);
    }
}