import { DomainEventHandler } from "src/domain/common/domain-event/domain-event-handler.i";
import AddUserPuzzleEvent from "../events/add-user-puzzle.event";
import IPuzzleSetRepository from "src/domain/common/repositories/puzzle-set.repository.i";

export default class AddUserPuzzleEventHandler implements DomainEventHandler<AddUserPuzzleEvent> {
    constructor(
        private readonly puzzleRepository: IPuzzleSetRepository,
    ) { }

    async handle(event: AddUserPuzzleEvent): Promise<void> {
        const puzzle = await this.puzzleRepository.getPuzzleById(event.puzzleOfEventId);
        if (!puzzle) {
            throw new Error('Puzzle not found');
        }
        event.user.addPuzzle(puzzle, event.quantity);
    }
}