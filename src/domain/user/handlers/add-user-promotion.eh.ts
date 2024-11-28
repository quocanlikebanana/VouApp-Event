import { DomainEventHandler } from "src/domain/common/domain-event/domain-event-handler.i";
import AddUserPromotionEvent from "../events/add-user-promotion.event";
import IPromotionRepository from "src/domain/common/repositories/promotion.repository.i";

export default class AddUserPromotionEventHandler implements DomainEventHandler<AddUserPromotionEvent> {
    constructor(
        private readonly promotionRepository: IPromotionRepository,
    ) { }

    async handle(event: AddUserPromotionEvent): Promise<void> {
        const promotion = await this.promotionRepository.getById(event.promotionOfEventId);
        if (!promotion) {
            throw new Error('Promotion not found');
        }
        event.user.addPromotion(promotion, event.quantity);
    }
}