import { Entity } from "src/domain/common/entity/entity.a";
import { checkAllPropertiesNotNull, removeNullValues } from "../common/helpers";
import { DomainError } from "../common/errors/domain.err";

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

    // More
};

export type CreateEventProps = Omit<EventProps, "eventStatus">;

export class EventEntity extends Entity<EventProps> {
    protected validate(props: EventProps): void {
        checkAllPropertiesNotNull(props);

        // Rule 1: Start date must be before end date
        if (props.startDate >= props.endDate) {
            throw new DomainError("Start date must be before end date");
        }
        const now = new Date();

        // Rule 2: Start date must be after now
        if (props.startDate <= now) {
            throw new DomainError("Start date must be after now");
        }
    }

    static create(event: CreateEventProps): EventEntity {
        // Rule 4: Event status must be PENDING when created
        const newEvent = new EventEntity({ ...event, eventStatus: "PENDING" });
        return newEvent;
    }

    updateNew(event: Partial<EventProps>): EventEntity {
        if (this.props.eventStatus === "PENDING" || this.props.eventStatus === "REJECTED") {
            const notNullEvent = removeNullValues(event);
            const newProps = { ...this.props, ...notNullEvent };
            const newEvent = new EventEntity(newProps, this.id);
            // Rule 3: Event status must be PENDING after update
            newEvent.props.eventStatus = "PENDING";
            return newEvent;
        }
        throw new DomainError("Cannot update event that is not in PENDING or REJECTED status");
    }
}