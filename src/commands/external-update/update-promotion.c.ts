import { ICommand } from "../common/abstract/command.handler.i";
import { ExternalPromotion } from "src/domain/common/types/external.type";
import IPromotionRepository from "src/domain/common/repositories/promotion.repository.i";

export default class UpdatePromotionCommand implements ICommand<ExternalPromotion, void> {
    constructor(
        private readonly promotionRepository: IPromotionRepository,
    ) { }

    async execute(param: ExternalPromotion): Promise<void> {
        await this.promotionRepository.updateExternal(param);
    }
}