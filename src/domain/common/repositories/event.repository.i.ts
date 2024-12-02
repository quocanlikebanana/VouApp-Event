import { EventAggregate } from "src/domain/event/event.agg";
import { ExternalPartner } from "../types/external.type";

export default abstract class IEventRepository {
    abstract getById(id: string): Promise<EventAggregate>;
    abstract createNew(event: EventAggregate): Promise<string>;
    abstract update(event: EventAggregate): Promise<void>;
    abstract delete(event: EventAggregate): Promise<void>;
    abstract updateExternal(exPartner: ExternalPartner): Promise<void>;
}