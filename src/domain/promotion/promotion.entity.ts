import { Entity } from "src/domain/common/entity/entity.a";
import { DomainError } from "src/domain/common/errors/domain.err";

export type PromotionProps = {
    ex_promotion: {
        id: number;
        name: string;
        description: string;
    }
    quantity: number;
};

export default class PromotionEntity extends Entity<PromotionProps> {
    protected validate(props: PromotionProps): void {
        if (props.quantity < 0) {
            throw new DomainError("Quantity must be positive");
        }
    }
}