import { EventEntity } from "src/domain/entities/envent.entity";

export default abstract class IEventRepository {
    abstract getById(id: number): Promise<EventEntity>;
    abstract createNew(event: EventEntity): Promise<number>;
    abstract updateById(event: EventEntity): Promise<void>;
    abstract deleteById(id: number): Promise<void>;
}