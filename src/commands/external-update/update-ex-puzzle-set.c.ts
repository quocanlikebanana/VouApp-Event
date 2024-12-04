import { ICommand } from "../common/command.handler.i";
import { ExternalPuzzleSet } from "src/domain/common/types/external.type";
import IUnitOfWork from "../common/unit-of-work.i";

export default class UpdateExPuzzleSetCommand implements ICommand<ExternalPuzzleSet, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: ExternalPuzzleSet): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            await uow.puzzleSetRepository.updateExternal(param);
        });
    }
}