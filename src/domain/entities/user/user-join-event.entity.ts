import { Entity } from "src/domain/common/entity/entity.a";

export type UserJoinEventProps = {
    eventId: number;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        facebook: string;
    }
    joinDate: Date;
};

export default class UserJoinEventEntity extends Entity<UserJoinEventProps> {
}