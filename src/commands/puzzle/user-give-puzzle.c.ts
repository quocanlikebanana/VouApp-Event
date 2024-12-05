import { Injectable } from "@nestjs/common";
import { ICommand } from "../common/command.handler.i";
import IUnitOfWork from "../common/unit-of-work.i";

export type UserGivePuzzleParam = {
    userGiveOfEventId: string;
    userTakeOfEventId: string;
    puzzleOfEventId: string;
    quantity: number;
};

@Injectable()
export class UserGivePuzzleCommand implements ICommand<UserGivePuzzleParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: UserGivePuzzleParam): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const userGive = await uow.userRepository.getById(param.userGiveOfEventId);
            if (!userGive) {
                throw new Error("User to give not found");
            }
            const userTake = await uow.userRepository.getById(param.userTakeOfEventId);
            if (!userTake) {
                throw new Error("User to take not found");
            }
            const puzzle = await uow.puzzleSetRepository.getPuzzleById(param.puzzleOfEventId);
            if (!puzzle) {
                throw new Error("Puzzle not found");
            }
            userGive.removePuzzle(puzzle, param.quantity);
            userTake.addPuzzle(puzzle, param.quantity);
            await uow.userRepository.updateHasPuzzle(userGive);
            await uow.userRepository.updateHasPuzzle(userTake);
        });
    }
}