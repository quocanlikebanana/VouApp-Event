import IPromotionRepository from "src/domain/common/repositories/promotion.repository.i";
import { ExternalPromotion } from "src/domain/common/types/external.type";
import { EventAggregate } from "src/domain/event/event.agg";
import PromotionAggregate from "src/domain/promotion/promotion.agg";
import { PrismaDatabaseService } from "../common/database/database.service";

export default class PromotionRepository implements IPromotionRepository {
    constructor(
        private readonly databaseService: PrismaDatabaseService
    ) { }

    async getById(id: string): Promise<PromotionAggregate> {
        const promotion = await this.databaseService.promotion_Of_Event.findUnique({
            where: {
                id
            },
        });
        return PromotionAggregate.create({
            ex_promotion: {
                id: promotion.id,
                name: promotion.promotionName,
                description: promotion.promotionDescription
            },
            quantityUseInEvent: promotion.quantity
        }, promotion.id);
    }

    async addPromotionsOfEvent(event: EventAggregate, promotions: PromotionAggregate[]): Promise<void> {
        await this.databaseService.promotion_Of_Event.createMany({
            data: promotions.map(p => {
                return {
                    promotionId: p.props.ex_promotion.id,
                    promotionName: p.props.ex_promotion.name,
                    promotionDescription: p.props.ex_promotion.description,
                    eventId: event.id,
                    quantity: p.props.quantityUseInEvent
                }
            })
        });
    }

    async removePromotionsOfEvent(event: EventAggregate): Promise<void> {
        await this.databaseService.promotion_Of_Event.deleteMany({
            where: {
                eventId: event.id
            }
        });
    }

    async updateExternal(exPromotion: ExternalPromotion): Promise<void> {
        await this.databaseService.promotion_Of_Event.updateMany({
            where: {
                promotionId: exPromotion.id
            },
            data: {
                promotionName: exPromotion.name,
                promotionDescription: exPromotion.description
            }
        });
    }
}