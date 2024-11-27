import UserExchangePuzzleSetValueObject from "src/domain/user/user-exchange-puzzleset.vo";
import UserJoinGameValueObject from "src/domain/user/user-join-game.vo";
import UserEntity from "src/domain/user/user.entity";

// User that joins an event; not all users. 
export default abstract class IUserRepository {
    abstract getById(id: number): Promise<UserEntity>;
    abstract create(user: UserEntity): Promise<void>;
    abstract remove(user: UserEntity): Promise<void>;
    abstract updatePuzzleSet(user: UserEntity): Promise<void>;
    abstract addPuzzleSetExchange(user: UserEntity, puzzleSetExchangeOfUser: UserExchangePuzzleSetValueObject): Promise<void>;
    abstract addGame(user: UserEntity, userJoinGame: UserJoinGameValueObject): Promise<void>;
}