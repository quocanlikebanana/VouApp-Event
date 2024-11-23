import { Entity } from "src/domain/common/entity/entity.a";

export type UserJoinEventHasPuzzleOfEventProps = {
    quantity: number;
    userJoinEventId: number;
    puzzleOfEventId: number;
};

export default class UserJoinEventHasPuzzleOfEventEntity extends Entity<UserJoinEventHasPuzzleOfEventProps> {
    constructor(id: number, props: UserJoinEventHasPuzzleOfEventProps) {
        super(id, props);
    }
}