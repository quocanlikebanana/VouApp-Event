import { ValueObject } from "src/domain/common/entity/value-object.a";

export type UserJoinGameProps = {
    turn: number;
    gameId: number;
};

export default class UserJoinGameValueObject extends ValueObject<UserJoinGameProps> {
    protected validate(props: UserJoinGameProps): void {
        if (props.turn < 0) {
            throw new Error("Turn must be greater than or equal to 0.");
        }

    }
}