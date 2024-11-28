import { DomainEventBase } from "../domain-event/domain-event.base";
import { Entity } from "./entity.a";

export default abstract class AggregateRoot<T> extends Entity<T> {
    private readonly domainEvents: DomainEventBase[];
}