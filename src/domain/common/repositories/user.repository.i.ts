import UserExchangePuzzleSetValueObject from "src/domain/user/user-exchange-puzzleset.vo";
import UserJoinGameHistoryValueObject from "src/domain/user/user-join-game-history.vo";
import UserJoinGameEntity from "src/domain/user/user-join-game.entity";
import UserAggregate from "src/domain/user/user.agg";

// User that joins an event; not all users. 
export default abstract class IUserRepository {
    abstract getById(id: number): Promise<UserAggregate>;
    abstract create(user: UserAggregate): Promise<void>;
    abstract remove(user: UserAggregate): Promise<void>;

    // Puzzle
    abstract updatePuzzleSet(user: UserAggregate): Promise<void>;
    abstract addPuzzleSetExchange(user: UserAggregate, puzzleSetExchangeOfUser: UserExchangePuzzleSetValueObject): Promise<void>;

    // Game
    abstract addGame(user: UserAggregate, userJoinGame: UserJoinGameEntity): Promise<void>;
    abstract updateGameTurn(user: UserAggregate, userJoinGame: UserJoinGameEntity): Promise<void>;
    abstract updateGame(user: UserAggregate, userJoinGame: UserJoinGameEntity): Promise<void>;
    abstract addGameHistory(user: UserAggregate, UserJoinGameHistory: UserJoinGameHistoryValueObject): Promise<void>;

    // Promotion
    abstract updatePromotion(user: UserAggregate): Promise<void>;
}