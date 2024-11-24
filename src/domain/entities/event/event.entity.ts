import { Entity } from "src/domain/common/entity/entity.a";
import { checkAllPropertiesNotNull, removeNullValues } from "../../common/helpers";
import { DomainError } from "../../common/errors/domain.err";
import { DomainEventDispatcher } from "src/domain/common/domain-event/domain-event-dispatcher";
import { PendingOutdatedEvent } from "./events/pending-outdated.event";
import { EventStatus } from "src/domain/common/types/enums";

export type EventProps = {
    name: string;
    eventStatus: EventStatus;
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
        if (props.startDate >= props.endDate) {
            throw new DomainError("Start date must be before end date");
        }
        const now = new Date();
        if (props.startDate <= now) {
            do {
                if (props.eventStatus === EventStatus.PENDING) {
                    this.props.eventStatus = EventStatus.REJECTED;
                }
                else if (props.eventStatus === EventStatus.APPROVED) {
                    this.props.eventStatus = EventStatus.STARTED;
                }
                else {
                    break;
                }
                DomainEventDispatcher.dispatch(new PendingOutdatedEvent(this.id));
            } while (false);
        }
    }

    static create(event: CreateEventProps): EventEntity {
        const now = new Date();
        if (event.startDate <= now) {
            throw new DomainError("Start date must be in the future");
        }
        const newEvent = new EventEntity({ ...event, eventStatus: EventStatus.PENDING });
        return newEvent;
    }

    recreate(event: Partial<EventProps>): EventEntity {
        if (this.props.eventStatus === EventStatus.PENDING || this.props.eventStatus === EventStatus.REJECTED) {
            const notNullEvent = removeNullValues(event);
            const newProps = { ...this.props, ...notNullEvent };
            const newEvent = EventEntity.create(newProps);
            return newEvent;
        }
        throw new DomainError("Cannot update event that is not in PENDING or REJECTED status");
    }

    checkDeleteable(): void {
        if (this.props.eventStatus === EventStatus.STARTED) {
            throw new DomainError("Cannot delete event that is STARTED");
        }
    }

    approve(): EventEntity {
        if (this.props.eventStatus === EventStatus.PENDING) {
            const newProps = { ...this.props, eventStatus: EventStatus.APPROVED };
            return new EventEntity(newProps, this.id);
        }
        throw new DomainError("Cannot approve event that is not in PENDING status");
    }
}