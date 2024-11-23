import { Entity } from "src/domain/common/entity/entity.a";

export type PuzzleSetOfEventProps = {
    puzzleSet: {
        id: number;
        name: string;
    }
    eventId: number;
    possibility: number;
};

export default class PuzzleSetOfEventEntity extends Entity<PuzzleSetOfEventProps> {
    constructor(id: number, props: PuzzleSetOfEventProps) {
        super(id, props);
    }
}