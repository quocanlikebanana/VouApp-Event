import { Entity } from "src/domain/common/entity/entity.a";

export type UserJoinEventJoinGameOfEventProps = {
    turn: number;
    userJoinEventId: number;
    gameOfEventId: number;
};

export default class UserJoinEventJoinGameOfEventEntity extends Entity<UserJoinEventJoinGameOfEventProps> {
}