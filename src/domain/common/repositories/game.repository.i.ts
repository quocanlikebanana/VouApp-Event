import { EventAggregate } from "src/domain/event/event.agg";
import GameAggregate from "src/domain/game/game.agg";
import { ExternalGame } from "../types/external.type";

export default abstract class IGameRepository {
    abstract getById(id: string): Promise<GameAggregate>;
    abstract getUserTop(userId: string, gameId: string): Promise<number>;
    abstract addGamesOfEvent(event: EventAggregate, games: GameAggregate[]): Promise<void>;
    abstract removeGamesOfEvent(event: EventAggregate): Promise<void>;
    abstract updateExternal(exGame: ExternalGame): Promise<void>;
}