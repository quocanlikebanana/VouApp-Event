import { EventEntity } from "src/domain/event/event.entity";
import PuzzleValueObject from "src/domain/puzzle/puzzle.vo";
import PuzzleSetEntity from "src/domain/puzzle/puzzleset.entity";

export default abstract class IPuzzleSetRepository {
    abstract getById(id: number): Promise<PuzzleSetEntity>;
    abstract getPuzzleById(id: number): Promise<PuzzleValueObject>;
    abstract addPuzzleSets(puzzleSet: PuzzleSetEntity[]): Promise<void>;
    abstract removePuzzleSetsOfEvent(event: EventEntity): Promise<void>;
}