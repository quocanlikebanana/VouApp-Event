import PuzzleValueObject from "../entities/puzzle/puzzle.vo";
import PuzzleSetEntity from "../entities/puzzle/puzzleset.entity";

export default abstract class IPuzzleSetRepository {
    abstract getById(id: number): Promise<PuzzleSetEntity>;
    abstract getPuzzleById(id: number): Promise<PuzzleValueObject>;
    abstract addPuzzleSets(puzzleSet: PuzzleSetEntity[]): Promise<void>;
    abstract removePuzzleSetsOfEvent(eventId: number): Promise<void>;
}