import { Entity } from "../common/entity/entity.a";

export type PuzzleProps = {
    ex: {
        id: string;
        name: string;
    }
    puzzleSetId: string;
}

export default class PuzzleEntity extends Entity<PuzzleProps> {
    protected validate(props: PuzzleProps): void {
    }
}