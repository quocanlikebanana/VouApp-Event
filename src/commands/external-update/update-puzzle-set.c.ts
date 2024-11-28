import IPuzzleSetRepository from "src/domain/common/repositories/puzzle-set.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import { ExternalPuzzleSet } from "src/domain/common/types/external.type";

export default class UpdatePuzzleSetCommand implements ICommand<ExternalPuzzleSet, void> {
    constructor(
        private readonly puzzleSetRepository: IPuzzleSetRepository,
    ) { }

    async execute(param: ExternalPuzzleSet): Promise<void> {
        await this.puzzleSetRepository.updateExternal(param);
    }
}