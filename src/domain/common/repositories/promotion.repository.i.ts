import { EventEntity } from "src/domain/event/event.entity";
import PromotionEntity from "src/domain/promotion/promotion.entity";

export default abstract class IPromotionRepository {
    abstract getById(id: number): Promise<PromotionEntity>;
    abstract addPromotions(promotion: PromotionEntity[]): Promise<void>;
    abstract removePromotionsOfEvent(event: EventEntity): Promise<void>;
} 