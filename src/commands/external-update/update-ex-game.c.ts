import { ICommand } from "../common/command.handler.i";
import { ExternalGame } from "src/domain/common/types/external.type";
import IUnitOfWork from "../common/unit-of-work.i";

export default class UpdateExGameCommand implements ICommand<ExternalGame, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: ExternalGame): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            await uow.gameRepository.updateExternal(param);
        });
    }
}