import { EventAggregate } from "src/domain/event/event.agg";
import PromotionAggregate from "src/domain/promotion/promotion.agg";

export default abstract class IPromotionRepository {
    abstract getById(id: number): Promise<PromotionAggregate>;
    abstract addPromotions(promotion: PromotionAggregate[]): Promise<void>;
    abstract removePromotionsOfEvent(event: EventAggregate): Promise<void>;
} 