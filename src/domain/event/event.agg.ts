import { checkAllPropertiesNotNull, removeNullValues } from "../common/helpers";
import { DomainError } from "../common/errors/domain.err";
import { DomainEventDispatcher } from "src/domain/common/domain-event/domain-event-dispatcher";
import { EventStatusUpdateEvent } from "./events/event-status-update.event";
import { EventStatus } from "src/domain/common/types/enums";
import { IEventStatusContext, createEventStatusContext } from "./subs/event.state.dp";
import AggregateRoot from "../common/entity/aggregate.a";

export type EventProps = {
    name: string;
    description: string;
    _eventStatusContext: IEventStatusContext;
    startDate: Date;
    endDate: Date;
    ex_partner: {
        id: string;
        name: string;
    }
};

export type CreateEventProps = Omit<EventProps, "_eventStatusContext"> & { status?: EventStatus };
export type UpdateEventProps = Omit<EventProps, "_eventStatusContext">;

export class EventAggregate extends AggregateRoot<EventProps> {
    protected validate(props: EventProps): void {
        const now = new Date();
        debugger;
        checkAllPropertiesNotNull(props);
        if (props.startDate <= now) {
            throw new DomainError("Start date must be in the future");
        }
        if (props.startDate >= props.endDate) {
            throw new DomainError("Start date must be before end date");
        }
        // Time status peristence
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

    static create(event: CreateEventProps, id?: string): EventAggregate {
        const newEvent = new EventAggregate(
            {
                ...event,
                _eventStatusContext: event.status ? createEventStatusContext(event.status) : createEventStatusContext(EventStatus.PENDING)
            }, id);
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