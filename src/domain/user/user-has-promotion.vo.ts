import { DomainError } from "src/domain/common/errors/domain.err";
import { ValueObject } from "src/domain/common/entity/value-object.a";

type UserHasPromotionProps = {
    quantity: number;
    promotionOfEventId: string;
};

export default class UserHasPromotionValueObject extends ValueObject<UserHasPromotionProps> {
    protected validate(props: UserHasPromotionProps): void {
        if (props.quantity < 0) {
            throw new DomainError("Quantity must be greater than or equal to 0.");
        }
    }
}
