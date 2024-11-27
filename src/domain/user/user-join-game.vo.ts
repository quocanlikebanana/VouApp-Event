import { ValueObject } from "src/domain/common/entity/value-object.a";
import UserJoinGameHistoryValueObject from "./user-join-game-history.vo";

export type UserJoinGameProps = {
    turn: number;
    gameOfEventId: number;
    histories: UserJoinGameHistoryValueObject[];
};

export default class UserJoinGameValueObject extends ValueObject<UserJoinGameProps> {
    protected validate(props: UserJoinGameProps): void {
        if (props.turn < 0) {
            throw new Error("Turn must be greater than or equal to 0.");
        }
    }
}