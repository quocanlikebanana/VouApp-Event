import { EventStatus } from "@prisma/client";
import { EventEntity } from "src/domain/event/event.entity";

export default abstract class IEventRepository {
    abstract getById(id: number): Promise<EventEntity>;
    abstract createNew(event: EventEntity): Promise<number>;
    abstract update(event: EventEntity): Promise<void>;
    abstract updateEventStatus(event: EventEntity): Promise<void>;
    abstract delete(event: EventEntity): Promise<void>;
}