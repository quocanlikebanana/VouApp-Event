import { EventEntity } from "src/domain/event/event.entity";
import GameEntity from "src/domain/game/game.entity";

export default abstract class IGameRepository {
    abstract getById(id: number): Promise<GameEntity>;
    abstract addGames(game: GameEntity[]): Promise<void>;
    abstract removeGamesOfEvent(event: EventEntity): Promise<void>;
}