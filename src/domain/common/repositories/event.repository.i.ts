import { EventStatus } from "@prisma/client";
import { EventAggregate } from "src/domain/event/event.agg";

export default abstract class IEventRepository {
    abstract getById(id: number): Promise<EventAggregate>;
    abstract createNew(event: EventAggregate): Promise<number>;
    abstract update(event: EventAggregate): Promise<void>;
    abstract updateEventStatus(event: EventAggregate): Promise<void>;
    abstract delete(event: EventAggregate): Promise<void>;
}