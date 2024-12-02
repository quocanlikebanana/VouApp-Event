import { EventAggregate } from "src/domain/event/event.agg";
import PromotionAggregate from "src/domain/promotion/promotion.agg";
import { ExternalPromotion } from "../types/external.type";

export default abstract class IPromotionRepository {
    abstract getById(id: string): Promise<PromotionAggregate>;
    abstract addPromotionsOfEvent(promotion: PromotionAggregate[]): Promise<void>;
    abstract removePromotionsOfEvent(event: EventAggregate): Promise<void>;
    abstract updateExternal(exPromotion: ExternalPromotion): Promise<void>;
} 