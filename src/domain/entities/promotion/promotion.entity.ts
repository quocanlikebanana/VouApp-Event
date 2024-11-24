import { Entity } from "src/domain/common/entity/entity.a";
import { DomainError } from "src/domain/common/errors/domain.err";

export type PromotionOfEventProps = {
    promotionId: number;
    promotionName: string;
    promotionDescription: string;
    quantity: number;
    eventId: number;
};

export default class PromotionOfEventEntity extends Entity<PromotionOfEventProps> {
    protected validate(props: PromotionOfEventProps): void {
        if (props.quantity < 0) {
            throw new DomainError("Quantity must be positive");
        }
    }
}