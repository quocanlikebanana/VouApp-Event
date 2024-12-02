import { ICommand } from "../common/abstract/command.handler.i";
import { ExternalPuzzleSet } from "src/domain/common/types/external.type";
import IUnitOfWork from "../common/abstract/unit-of-work.i";

export default class UpdatePuzzleSetCommand implements ICommand<ExternalPuzzleSet, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: ExternalPuzzleSet): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            await uow.puzzleSetRepository.updateExternal(param);
        });
    }
}