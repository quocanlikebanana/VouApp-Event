import { DomainError } from "src/domain/common/errors/domain.err";
import AggregateRoot from "../common/entity/aggregate.a";

export type PromotionProps = {
    ex_promotion: {
        id: number;
        name: string;
        description: string;
    }
    quantityUseInEvent: number;
};

export default class PromotionAggregate extends AggregateRoot<PromotionProps> {
    protected validate(props: PromotionProps): void {
        if (props.quantityUseInEvent < 0) {
            throw new DomainError("Quantity must be positive");
        }
    }
}