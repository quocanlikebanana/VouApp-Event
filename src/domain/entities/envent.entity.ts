import { Entity } from "src/domain/common/entity/entity.a";

export type EventProps = {
    name: string;
    eventStatus: "PENDING" | "APPROVED" | "REJECTED" | "STARTED" | "ENDED";
    description: string;
    startDate: Date;
    endDate: Date;
    partner: {
        partnerId: number;
        partnerName: string;
    }
};

export class EventEntity extends Entity<EventProps> {
    constructor(id: number, props: EventProps) {
        super(id, props);
    }
}