import { checkAllPropertiesNotNull, removeNullValues } from "../common/helpers";
import { DomainError } from "../common/errors/domain.err";
import { DomainEventDispatcher } from "src/domain/common/domain-event/domain-event-dispatcher";
import { EventStatusUpdateEvent } from "./events/event-status-update.event";
import { EventStatus } from "src/domain/common/types/enums";
import EventStatusContext from "./subs/event.state.dp";
import AggregateRoot from "../common/entity/aggregate.a";

export type EventProps = {
    name: string;
    description: string;
    _eventStatusContext: EventStatusContext;
    startDate: Date;
    endDate: Date;
    ex_partner: {
        id: number;
        name: string;
    }
};

export type CreateEventProps = Omit<EventProps, "_eventStatusContext">;
export type UpdateEventProps = Omit<EventProps, "_eventStatusContext">;

export class EventAggregate extends AggregateRoot<EventProps> {
    protected validate(props: EventProps): void {
        checkAllPropertiesNotNull(props);
        if (props.startDate >= props.endDate) {
            throw new DomainError("Start date must be before end date");
        }
        // Time status peristence
        const now = new Date();
        try {
            if (props.startDate <= now) {
                this.props._eventStatusContext.start();
            }
            else if (props.endDate <= now) {
                this.props._eventStatusContext.end();
            }
            DomainEventDispatcher.dispatch(new EventStatusUpdateEvent(this));
        } catch (error) {
            throw (error);
        }
    }

    static create(event: CreateEventProps): EventAggregate {
        const now = new Date();
        if (event.startDate <= now) {
            throw new DomainError("Start date must be in the future");
        }
        const newEvent = new EventAggregate({ ...event, _eventStatusContext: new EventStatusContext(EventStatus.PENDING) });
        return newEvent;
    }

    update(event: Partial<UpdateEventProps>): void {
        this.props._eventStatusContext.update();
        const notNullProps = removeNullValues(event);
        const newProps = { ...this.props, ...notNullProps };
        this.props = newProps;
    }

    checkDeleteable(): void {
        if (this.props._eventStatusContext.getState() === EventStatus.STARTED) {
            throw new DomainError("Cannot delete event that is STARTED");
        }
    }

    approve(): void {
        this.props._eventStatusContext.approve();
    }
}