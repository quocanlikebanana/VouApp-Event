import { Entity } from "src/domain/common/entity/entity.a";
import PuzzleSetPrizeValueObject from "./puzzle-set-prize.vo";
import { DomainError } from "src/domain/common/errors/domain.err";
import PuzzleEntity from "./puzzle.entity";
import AggregateRoot from "../common/entity/aggregate.a";

export type PuzzleSetProps = {
    ex_puzzleSet: {
        id: number;
        name: string
    }
    puzzles: PuzzleEntity[];
    puzzleSetPrize: PuzzleSetPrizeValueObject[];
};

export default class PuzzleSetAggregate extends AggregateRoot<PuzzleSetProps> {
    protected validate(props: PuzzleSetProps): void {
        if (props.puzzles.length === 0) {
            throw new DomainError("Puzzle set must have at least one puzzle");
        }
        if (props.puzzleSetPrize.length === 0) {
            throw new DomainError("Puzzle set must have at least one prize");
        }
        const puzzleIds = props.puzzles.map(puzzle => puzzle.id);
        const uniquePuzzleIds = new Set(puzzleIds);
        if (uniquePuzzleIds.size !== puzzleIds.length) {
            throw new DomainError("All puzzle IDs must be distinct");
        }
    }

    getpuzzleSetPrize(): PuzzleSetPrizeValueObject[] {
        return this.props.puzzleSetPrize;
    }

    updateExternal(puzzleSetName: string) {
        this.props.ex_puzzleSet.name = puzzleSetName;
    }
}