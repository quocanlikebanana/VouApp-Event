import { DomainError } from "src/domain/common/errors/domain.err";
import PuzzleValueObject from "../puzzle/puzzle.vo";
import { ValueObject } from "src/domain/common/entity/value-object.a";

type UserHasPuzzleProps = {
    quantity: number;
    puzzle: PuzzleValueObject;
};

export default class UserHasPuzzleValueObject extends ValueObject<UserHasPuzzleProps> {
    protected validate(props: UserHasPuzzleProps): void {
        if (props.quantity < 0) {
            throw new DomainError("Quantity must be greater than or equal to 0.");
        }
    }
}