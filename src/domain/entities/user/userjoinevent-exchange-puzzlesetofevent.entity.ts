import { Entity } from "src/domain/common/entity/entity.a";

export type UserJoinEventExchangePuzzleSetOfEventProps = {
    exchangeDate: Date;
    userJoinEventId: number;
    puzzleSetOfEventId: number;
};

export default class UserJoinEventExchangePuzzleSetOfEventEntity extends Entity<UserJoinEventExchangePuzzleSetOfEventProps> {
    constructor(id: number, props: UserJoinEventExchangePuzzleSetOfEventProps) {
        super(id, props);
    }
}