import IEventRepository from "src/domain/repositories/event.repository.i";
import { EventAggregate } from "src/domain/event/event.agg";
import { PrismaDatabaseService } from "../common/database/database.service";
import RepositoryError from "../common/error/repository.err";
import { Injectable } from "@nestjs/common";
import { $Enums, EventStatus } from "@prisma/client";

@Injectable()
export default class EventRepository implements IEventRepository {
    constructor(
        private readonly databaseService: PrismaDatabaseService,
    ) { }

    async createNew(event: EventAggregate): Promise<number> {
        const result = await this.databaseService.event.create({
            data: {
                name: event.props.name,
                status: event.props.eventStatus,
                description: event.props.description,
                startDate: event.props.startDate,
                endDate: event.props.endDate,
                partnerId: event.props.@partner.partnerId,
            partnerName: event.props.@partner.partnerName,
            }
});
return result.id;
    }

    async updateById(event: EventAggregate): Promise < void> {
    if(!event.id) {
    throw new RepositoryError('Event ID is required');
}
const result = await this.databaseService.event.update({
    where: {
        id: event.id
    },
    data: {
        name: event.props.name,
        status: event.props.eventStatus,
        description: event.props.description,
        startDate: event.props.startDate,
        endDate: event.props.endDate,
        partnerId: event.props.@partner.partnerId,
    partnerName: event.props.@partner.partnerName,
            }
        });
if (!result) {
    throw new RepositoryError('Event not found');
}
    }

    async deleteById(id: number): Promise < void> {
    const result = await this.databaseService.event.delete({
        where: {
            id: id
        }
    });
    if(!result) {
        throw new RepositoryError('Event not found');
    }
}
}