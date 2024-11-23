import { Entity } from "src/domain/common/entity/entity.a";

export type PuzzleOfEventProps = {
    puzzle: {
        id: number;
        name: string;
    }
    puzzleSetOfEventId: number;
};

export default class PuzzleOfEventEntity extends Entity<PuzzleOfEventProps> {
}