import PromotionEntity from "../entities/promotion/promotion.entity";

export default abstract class IPromotionRepository {
    abstract getById(id: number): Promise<PromotionEntity>;
    abstract addPromotions(promotion: PromotionEntity[]): Promise<void>;
    abstract removePromotionsOfEvent(eventId: number): Promise<void>;
} 