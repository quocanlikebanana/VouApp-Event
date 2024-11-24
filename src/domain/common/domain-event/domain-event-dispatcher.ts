import { PendingOutdatedEvent } from "src/domain/entities/event/events/pending-outdated.event";
import { PendingOutdatedEventHandler } from "src/domain/entities/event/handlers/pending-outdated.event.handler";
import { DomainEventHandler } from "./domain-event-handler.i";
import { DomainEventBase } from "./domain-event.base";
import { Injectable } from "@nestjs/common";

// 4 methods:
// + Module ref: https://stackoverflow.com/questions/64312229/how-to-manually-inject-dependency-in-nestjs?rq=3
// + Set app to AppModule: https://stackoverflow.com/a/74289576/23939248
// + Get app instance in main.ts: https://stackoverflow.com/a/68063923/23939248
// + Use EventEmitter (no more dispatch): https://docs.nestjs.com/techniques/events#example.

@Injectable()
export class DomainEventDispatcher {
    private static handlers: {
        [eventName: string]: DomainEventHandler<DomainEventBase>[]
    } = {};

    constructor(
        private readonly pendingOutdatedEventHandler: PendingOutdatedEventHandler
    ) {
        DomainEventDispatcher.register(PendingOutdatedEvent, this.pendingOutdatedEventHandler);
    }

    private static register<T extends DomainEventBase>(eventClass: new (...args: any[]) => T, handler: DomainEventHandler<T>): void {
        const eventName = eventClass.name;
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(handler as DomainEventHandler<DomainEventBase>);
    }

    static dispatch(event: DomainEventBase): void {
        const eventName = event.constructor.name;
        if (this.handlers[eventName]) {
            this.handlers[eventName].forEach(handler => handler.handle(event));
            this.handlers[eventName] = [];
        }
    }
}