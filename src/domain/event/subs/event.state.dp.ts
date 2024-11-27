import { DomainError } from "src/domain/common/errors/domain.err";
import { EventStatus } from "src/domain/common/types/enums";

class EventStatusContext {
    private state: EventStatusState;

    constructor(eventStatus: EventStatus) {
        switch (eventStatus) {
            case EventStatus.PENDING:
                this.transitionTo(new PendingState());
                break;
            case EventStatus.APPROVED:
                this.transitionTo(new ApprovedState());
                break;
            case EventStatus.REJECTED:
                this.transitionTo(new RejectedState());
                break;
            case EventStatus.STARTED:
                this.transitionTo(new StartedState());
                break;
            case EventStatus.ENDED:
                this.transitionTo(new EndedState());
                break;
            default:
                throw new DomainError("Invalid event status");
        }
    }

    public transitionTo(state: EventStatusState): void {
        this.state = state;
        this.state.setContext(this);
    }

    public getState(): EventStatus {
        return this.state.getState();
    }

    public approve(): void {
        this.state.approve();
    }

    public reject(): void {
        this.state.reject();
    }

    public update(): void {
        this.state.update();
    }

    public start(): void {
        this.state.start();
    }

    public end(): void {
        this.state.end();
    }
}

abstract class EventStatusState {
    protected context: EventStatusContext;

    public setContext(context: EventStatusContext): void {
        this.context = context;
    }

    abstract getState(): EventStatus;

    abstract approve(): void;
    abstract reject(): void;
    abstract update(): void;
    abstract start(): void;
    abstract end(): void;
}

class PendingState extends EventStatusState {
    getState(): EventStatus {
        return EventStatus.PENDING;
    }

    public approve(): void {
        this.context.transitionTo(new ApprovedState());
    }

    public reject(): void {
        this.context.transitionTo(new RejectedState());
    }

    public update(): void {
    }

    public start(): void {
        this.context.transitionTo(new RejectedState());
    }

    public end(): void {
        throw new DomainError("Cannot end event that is not started");
    }
}

class ApprovedState extends EventStatusState {
    getState(): EventStatus {
        return EventStatus.APPROVED;
    }

    public approve(): void {
        throw new DomainError("Cannot approve event that is already approved");
    }

    public reject(): void {
        throw new DomainError("Cannot reject event that is already approved");
    }

    public update(): void {
        this.context.transitionTo(new PendingState());
    }

    public start(): void {
        this.context.transitionTo(new StartedState());
    }

    public end(): void {
        throw new DomainError("Cannot end event that is not started");
    }
}

class RejectedState extends EventStatusState {
    getState(): EventStatus {
        return EventStatus.REJECTED;
    }

    public approve(): void {
        throw new DomainError("Cannot approve event that is already rejected");
    }

    public reject(): void {
        throw new DomainError("Cannot reject event that is already rejected");
    }

    public update(): void {
        throw new DomainError("Cannot update event that is rejected");
    }

    public start(): void {
        throw new DomainError("Cannot start event that is not approved");
    }

    public end(): void {
        throw new DomainError("Cannot end event that is not started");
    }
}

class StartedState extends EventStatusState {
    getState(): EventStatus {
        return EventStatus.STARTED;
    }

    public approve(): void {
        throw new DomainError("Cannot approve event that is already started");
    }

    public reject(): void {
        throw new DomainError("Cannot reject event that is already started");
    }

    public update(): void {
        throw new DomainError("Cannot update event that is started");
    }

    public start(): void {
        throw new DomainError("Cannot start event that is already started");
    }

    public end(): void {
        this.context.transitionTo(new EndedState());
    }
}

class EndedState extends EventStatusState {
    getState(): EventStatus {
        return EventStatus.ENDED;
    }

    public approve(): void {
        throw new DomainError("Cannot approve event that is ended");
    }

    public reject(): void {
        throw new DomainError("Cannot reject event that is ended");
    }

    public update(): void {
        throw new DomainError("Cannot update event that is ended");
    }

    public start(): void {
        throw new DomainError("Cannot start event that is ended");
    }

    public end(): void {
        throw new DomainError("Cannot end event that is already ended");
    }
}

export default EventStatusContext;