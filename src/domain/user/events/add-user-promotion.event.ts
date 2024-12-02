import { DomainEventBase } from "src/domain/common/domain-event/domain-event.base";
import UserAggregate from "../user.agg";

export default class AddUserPromotionEvent extends DomainEventBase {
    constructor(
        public readonly user: UserAggregate,
        public readonly promotionOfEventId: string,
        public readonly quantity: number,
    ) {
        super();
    }
}