import { EventStatusUpdateEvent } from "src/domain/event/events/event-status-update.event";
import { EventStatusUpdateEventHandler } from "src/domain/event/handlers/event-status-update.eh";
import { DomainEventHandler } from "./domain-event-handler.i";
import { DomainEventBase } from "./domain-event.base";
import { Injectable } from "@nestjs/common";
import AddUserPromotionEvent from "src/domain/user/events/add-user-promotion.event";
import AddUserPromotionEventHandler from "src/domain/user/handlers/add-user-promotion.eh";
import AddUserPuzzleEventHandler from "src/domain/user/handlers/add-user-puzzle.eh";
import AddUserPuzzleEvent from "src/domain/user/events/add-user-puzzle.event";

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
        private readonly pendingOutdatedEventHandler: EventStatusUpdateEventHandler,
        private readonly addUserPromotionEventHandler: AddUserPromotionEventHandler,
        private readonly addUserPuzzleEventHandler: AddUserPuzzleEventHandler,
    ) {
        DomainEventDispatcher.register(EventStatusUpdateEvent, this.pendingOutdatedEventHandler);
        DomainEventDispatcher.register(AddUserPromotionEvent, this.addUserPromotionEventHandler);
        DomainEventDispatcher.register(AddUserPuzzleEvent, this.addUserPuzzleEventHandler);
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