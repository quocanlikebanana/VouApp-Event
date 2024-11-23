import { Entity } from "src/domain/common/entity/entity.a";

export type UserJoinEventJoinGameOfEventHistoryProps = {
    stats: {};
    date: Date;
    order: number;
    userJoinEventJoinGameOfEventId: number;
    rewardId?: number;
};

export default class UserJoinEventJoinGameOfEventHistoryEntity extends Entity<UserJoinEventJoinGameOfEventHistoryProps> {
    constructor(id: number, props: UserJoinEventJoinGameOfEventHistoryProps) {
        super(id, props);
    }
}