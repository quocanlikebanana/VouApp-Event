import { ValueObject } from "src/domain/common/entity/value-object.a";
import { DomainError } from "src/domain/common/errors/domain.err";

export type PuzzleSetPrizeProps = {
    quantity: number;
    possibility: number;
    promotionOfEventId: number;
};

export default class PuzzleSetPrizeValueObject extends ValueObject<PuzzleSetPrizeProps> {
    protected validate(props: PuzzleSetPrizeProps): void {
        if (props.quantity < 0) {
            throw new DomainError("Quantity must be positive");
        }
        if (props.possibility < 0) {
            throw new DomainError("Possibility must be positive");
        }
        if (props.possibility > 1) {
            throw new DomainError("Possibility must be less than or equal to 1");
        }
    }
}