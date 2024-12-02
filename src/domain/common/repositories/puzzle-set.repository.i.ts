import { EventAggregate } from "src/domain/event/event.agg";
import PuzzleEntity from "src/domain/puzzle/puzzle.entity";
import PuzzleSetAggregate from "src/domain/puzzle/puzzleset.agg";
import { ExternalPuzzleSet } from "../types/external.type";

export default abstract class IPuzzleSetRepository {
    abstract getById(puzzleSetId: string): Promise<PuzzleSetAggregate>;
    abstract getPuzzleById(puzzleId: string): Promise<PuzzleEntity>;
    abstract addPuzzleSetsOfEvent(event: EventAggregate, puzzleSet: PuzzleSetAggregate[]): Promise<void>;
    abstract removePuzzleSetsOfEvent(event: EventAggregate): Promise<void>;
    abstract updateExternal(exPuzzleSet: ExternalPuzzleSet): Promise<void>;
}