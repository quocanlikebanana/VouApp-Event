import GameEntity from "../entities/game/game.entity";

export default abstract class IGameRepository {
    abstract getById(id: number): Promise<GameEntity>;
    abstract addGames(game: GameEntity[]): Promise<void>;
    abstract removeGamesOfEvent(eventId: number): Promise<void>;
}