import { Entity } from "src/domain/common/entity/entity.a";
import UserHasPuzzleValueObject from "./user-has-puzzle.vo";
import UserExchangePuzzleSetValueObject from "./user-exchange-puzzleset.vo";
import UserJoinGameValueObject from "./user-join-game.vo";
import { DomainError } from "src/domain/common/errors/domain.err";

export type UserProps = {
    eventId: number;
    ex_user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        facebook: string;
    }
    joinDate: Date;
    userHasPuzzle: UserHasPuzzleValueObject[];
    userExchangePuzzleSet: UserExchangePuzzleSetValueObject[];
    userJoinGame: UserJoinGameValueObject[];
};

export default class UserEntity extends Entity<UserProps> {
    protected validate(props: UserProps): void {
        const now = new Date();
        if (props.joinDate > now) {
            throw new DomainError("Join date must be in the past");
        }
        // Reduce and accumulate if the user has the same puzzle multiple times
        const userHasPuzzleMap = props.userHasPuzzle.reduce((acc, item) => {
            if (acc.has(item.props.puzzle.props.ex_id)) {
                acc.get(item.props.puzzle.props.ex_id).props.quantity += item.props.quantity;
            }
            else {
                acc.set(item.props.puzzle.props.ex_id, item);
            }
            return acc;
        }, new Map<number, UserHasPuzzleValueObject>());
        props.userHasPuzzle = Array.from(userHasPuzzleMap.values());
        // Check if the user join the same game multiple times
        const gamgeIdSet = new Set<number>();
        for (const item of props.userJoinGame) {
            if (gamgeIdSet.has(item.props.gameId)) {
                throw new DomainError("User can only join a game once");
            }
            gamgeIdSet.add(item.props.gameId);
        }
    }
}