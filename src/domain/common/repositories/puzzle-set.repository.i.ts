import { EventAggregate } from "src/domain/event/event.agg";
import PuzzleEntity from "src/domain/puzzle/puzzle.entity";
import PuzzleSetAggregate from "src/domain/puzzle/puzzleset.agg";
import { ExternalPuzzleSet } from "../types/external.type";

export default abstract class IPuzzleSetRepository {
    abstract getById(puzzleSetId: number): Promise<PuzzleSetAggregate>;
    abstract getPuzzleById(puzzleId: number): Promise<PuzzleEntity>;
    abstract addPuzzleSets(puzzleSet: PuzzleSetAggregate[]): Promise<void>;
    abstract removePuzzleSetsOfEvent(event: EventAggregate): Promise<void>;
    abstract updateExternal(exPuzzleSet: ExternalPuzzleSet): Promise<void>;
}