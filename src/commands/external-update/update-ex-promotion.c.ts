import { ICommand } from "../common/command.handler.i";
import { ExternalPromotion } from "src/domain/common/types/external.type";
import IUnitOfWork from "../common/unit-of-work.i";

export default class UpdateExPromotionCommand implements ICommand<ExternalPromotion, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: ExternalPromotion): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            await uow.promotionRepository.updateExternal(param);
        });
    }
}