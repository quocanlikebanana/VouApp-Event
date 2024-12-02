import { DomainError } from "src/domain/common/errors/domain.err";
import { Entity } from "../common/entity/entity.a";

type UserHasPuzzleProps = {
    quantity: number;
    puzzleOfEventId: string;
};

export default class UserHasPuzzleEntity extends Entity<UserHasPuzzleProps> {
    protected validate(props: UserHasPuzzleProps): void {
        if (props.quantity < 0) {
            throw new DomainError("Quantity must be greater than or equal to 0.");
        }
    }

    addQuantity(quantity: number): void {
        this.props.quantity += quantity;
    }

    subtractQuantity(quantity: number): void {
        if (this.props.quantity < quantity) {
            throw new DomainError("User does not have enough puzzles");
        }
        this.props.quantity -= quantity;
    }
}