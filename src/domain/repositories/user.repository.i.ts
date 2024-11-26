import UserEntity from "../entities/user/user.entity";

export default abstract class IUserRepository {
    abstract getById(id: number): Promise<UserEntity>;
    abstract getUsersOfGameOrderByScore(gameId: number, top: number): Promise<UserEntity[]>;
    abstract getRankingOfUserInGame(userId: number, gameId: number): Promise<number>;
}