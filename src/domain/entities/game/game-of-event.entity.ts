import { Entity } from "src/domain/common/entity/entity.a";

export type GameOfEventProps = {
    game: {
        id: number;
        name: string;
        description: string;
    }
    eventId: number;
};

export default class GameOfEventEntity extends Entity<GameOfEventProps> {
}