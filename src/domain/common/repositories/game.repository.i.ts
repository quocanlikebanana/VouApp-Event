import { EventAggregate } from "src/domain/event/event.agg";
import GameAggregate from "src/domain/game/game.agg";
import UserJoinGameEntity from "src/domain/user/user-join-game.entity";
import { ExternalGame } from "../types/external.type";

export default abstract class IGameRepository {
    abstract getById(id: number): Promise<GameAggregate>;
    abstract getUserTop(userId: number, gameId: number): Promise<number>;
    abstract addGames(game: GameAggregate[]): Promise<void>;
    abstract removeGamesOfEvent(event: EventAggregate): Promise<void>;
    abstract updateExternal(exGame: ExternalGame): Promise<void>;
}