import IEventRepository from "src/domain/contracts/repositories/event.repository.i";
import { EventEntity } from "src/domain/entities/envent.entity";
import { PrismaDatabaseService } from "../common/database/database.service";
import RepositoryError from "../common/error/repository.err";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class EventRepository implements IEventRepository {
    constructor(
        private readonly databaseService: PrismaDatabaseService,
    ) { }

    async createNew(event: EventEntity): Promise<number> {
        const result = await this.databaseService.event.create({
            data: {
                name: event.props.name,
                status: event.props.eventStatus,
                description: event.props.description,
                startDate: event.props.startDate,
                endDate: event.props.endDate,
                partnerId: event.props.partner.partnerId,
                partnerName: event.props.partner.partnerName,
            }
        });
        return result.id;
    }

    async updateById(event: EventEntity): Promise<void> {
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
                partnerId: event.props.partner.partnerId,
                partnerName: event.props.partner.partnerName,
            }
        });
        if (!result) {
            throw new RepositoryError('Event not found');
        }
    }

    async deleteById(id: number): Promise<void> {
        const result = await this.databaseService.event.delete({
            where: {
                id: id
            }
        });
        if (!result) {
            throw new RepositoryError('Event not found');
        }
    }
}