export default abstract class IEventRepository {
    abstract getAll(): Promise<Event[]>;
    abstract getById(id: number): Promise<Event>;
    abstract getByUserId(userId: number): Promise<Event[]>;
    abstract createNew(event: Event): Promise<void>;
    abstract updateById(id: number, event: Event): Promise<void>;
    abstract deleteById(id: number): Promise<void>;
}