import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import IPuzzleSetRepository from "src/domain/common/repositories/puzzle-set.repository.i";

export type UserGivePuzzleParam = {
    userGiveOfEventId: number;
    userTakeOfEventId: number;
    puzzleOfEventId: number;
    quantity: number;
};

export class UserGivePuzzleCommand implements ICommand<UserGivePuzzleParam, void> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly puzzleSetRepository: IPuzzleSetRepository,
    ) { }

    async execute(param: UserGivePuzzleParam): Promise<void> {
        const userGive = await this.userRepository.getById(param.userGiveOfEventId);
        if (!userGive) {
            throw new Error("User to give not found");
        }
        const userTake = await this.userRepository.getById(param.userTakeOfEventId);
        if (!userTake) {
            throw new Error("User to take not found");
        }
        const puzzle = await this.puzzleSetRepository.getPuzzleById(param.puzzleOfEventId);
        if (!puzzle) {
            throw new Error("Puzzle not found");
        }
        userGive.removePuzzle(puzzle, param.quantity);
        userTake.addPuzzle(puzzle, param.quantity);
        await this.userRepository.updateHasPuzzle(userGive);
        await this.userRepository.updateHasPuzzle(userTake);
    }
}