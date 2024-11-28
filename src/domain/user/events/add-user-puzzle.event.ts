import { DomainEventBase } from "src/domain/common/domain-event/domain-event.base";
import UserAggregate from "../user.agg";

export default class AddUserPuzzleEvent extends DomainEventBase {
    constructor(
        public readonly user: UserAggregate,
        public readonly puzzleOfEventId: number,
        public readonly quantity: number,
    ) {
        super();
    }
}