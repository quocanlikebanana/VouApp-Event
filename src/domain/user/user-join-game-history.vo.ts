import { ValueObject } from "src/domain/common/entity/value-object.a";
import RewardValueObject from "../game/reward.vo";

export type UserJoinGameHistoryProps = {
    date: Date;
    score: number;
    rewards: RewardValueObject[];
};

export default class UserJoinGameHistoryValueObject extends ValueObject<UserJoinGameHistoryProps> {
    protected validate(props: UserJoinGameHistoryProps): void {
        const now = new Date();
        if (props.date > now) {
            throw new Error("Date must be less than or equal to current date.");
        }
    }
}