import { $Enums } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import IEventRepository from "src/domain/common/repositories/event.repository.i";
import { EventStatus } from "src/domain/common/types/enums";
import { ExternalPartner } from "src/domain/common/types/external.type";
import { EventAggregate } from "src/domain/event/event.agg";
import { PrismaDatabaseService } from "../common/database/database.service";

type EventDataModel = {
    id?: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: $Enums.EventStatus;
    partnerId: string;
    partnerName: string;
}

function toEntity(event: EventDataModel): EventAggregate {
    return EventAggregate.create({
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        status: event.status as EventStatus,
        ex_partner: {
            id: event.partnerId,
            name: event.partnerName,
        }
    }, event.id);
}

function toDataModel(event: EventAggregate): EventDataModel {
    return {
        id: event.id,
        name: event.props.name,
        description: event.props.description,
        startDate: event.props.startDate,
        endDate: event.props.endDate,
        status: event.props._eventStatusContext.getState() as $Enums.EventStatus,
        partnerId: event.props.ex_partner.id,
        partnerName: event.props.ex_partner.name,
    }
}

@Injectable()
export default class EventRepository implements IEventRepository {
    constructor(
        private readonly databaseService: PrismaDatabaseService,
    ) { }

    async getById(id: string): Promise<EventAggregate> {
        const event = await this.databaseService.event.findUnique({
            where: {
                id: id
            }
        })
        return toEntity(event);
    }

    async createNew(event: EventAggregate): Promise<string> {
        const res = await this.databaseService.event.create({
            data: toDataModel(event)
        });
        return res.id;
    }

    async update(event: EventAggregate): Promise<void> {
        const dataModel = toDataModel(event);
        await this.databaseService.event.update({
            where: {
                id: event.id
            },
            data: dataModel
        });
    }

    async delete(event: EventAggregate): Promise<void> {
        await this.databaseService.event.delete({
            where: {
                id: event.id
            }
        });
    }

    async updateExternal(exPartner: ExternalPartner): Promise<void> {
        await this.databaseService.event.updateMany({
            where: {
                partnerId: exPartner.id
            },
            data: {
                partnerName: exPartner.name
            }
        });
    }
}