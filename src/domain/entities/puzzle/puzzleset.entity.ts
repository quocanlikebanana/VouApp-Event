import { Entity } from "src/domain/common/entity/entity.a";
import PuzzleValueObject from "./puzzle.vo";
import PuzzleSetPrizeValueObject from "./puzzle-set-prize.vo";
import { DomainError } from "src/domain/common/errors/domain.err";

export type PuzzleSetProps = {
    ex_puzzleSet: {
        id: number;
        name: string
    }
    puzzles: PuzzleValueObject[];
    puzzleSetPrize: PuzzleSetPrizeValueObject[];
};

export default class PuzzleSetEntity extends Entity<PuzzleSetProps> {
    protected validate(props: PuzzleSetProps): void {
        if (props.puzzles.length === 0) {
            throw new DomainError("Puzzle set must have at least one puzzle");
        }
        if (props.puzzleSetPrize.length === 0) {
            throw new DomainError("Puzzle set must have at least one prize");
        }
        const puzzleIds = props.puzzles.map(puzzle => puzzle.props.ex_id);
        const uniquePuzzleIds = new Set(puzzleIds);
        if (uniquePuzzleIds.size !== puzzleIds.length) {
            throw new DomainError("All puzzle IDs must be distinct");
        }
    }
}