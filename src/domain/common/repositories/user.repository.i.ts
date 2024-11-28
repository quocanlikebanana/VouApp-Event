import UserExchangePuzzleSetValueObject from "src/domain/user/user-exchange-puzzleset.vo";
import UserJoinGameHistoryValueObject from "src/domain/user/user-join-game-history.vo";
import UserJoinGameEntity from "src/domain/user/user-join-game.entity";
import UserAggregate from "src/domain/user/user.agg";
import { ExternalUser } from "../types/external.type";

// User that joins an event; not all users. 
export default abstract class IUserRepository {
    abstract getById(id: number): Promise<UserAggregate>;
    abstract create(user: UserAggregate): Promise<void>;
    abstract remove(user: UserAggregate): Promise<void>;
    abstract updateExternal(exUser: ExternalUser): Promise<void>;

    // Puzzle
    abstract updateHasPuzzle(user: UserAggregate): Promise<void>;
    abstract addExchangePuzzleSet(user: UserAggregate, puzzleSetExchangeOfUser: UserExchangePuzzleSetValueObject): Promise<void>;

    // Game
    abstract addJoinGame(user: UserAggregate, userJoinGame: UserJoinGameEntity): Promise<void>;
    abstract updateJoinGame(user: UserAggregate, userJoinGame: UserJoinGameEntity): Promise<void>;
    abstract addJoinGameHistory(user: UserAggregate, UserJoinGameHistory: UserJoinGameHistoryValueObject): Promise<void>;

    // Promotion
    abstract updatePromotion(user: UserAggregate): Promise<void>;
}