import { Entity } from "../common/entity/entity.a";

export type PuzzleProps = {
    ex: {
        id: number;
        name: string;
    }
    puzzleSetId: number;
}

export default class PuzzleEntity extends Entity<PuzzleProps> {
    protected validate(props: PuzzleProps): void {
    }
}