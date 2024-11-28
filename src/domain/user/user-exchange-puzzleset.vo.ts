import { ValueObject } from "src/domain/common/entity/value-object.a";

type UserExchangePuzzleSetProps = {
    exchangeDate: Date;
    puzzleSetOfEventId: number;
};

export default class UserExchangePuzzleSetValueObject extends ValueObject<UserExchangePuzzleSetProps> {
    protected validate(props: UserExchangePuzzleSetProps): void {
        const now = new Date();
        if (props.exchangeDate > now) {
            throw new Error("Exchange date must be less than or equal to current date.");
        }
    }
}