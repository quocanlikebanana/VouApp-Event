import { Entity } from "src/domain/common/entity/entity.a";

export type PromotionOfEventProps = {
    promotion: {
        id: number;
        name: string;
        description: string;
    };
    eventId: number;
    quantity: number;
};

export default class PromotionOfEventEntity extends Entity<PromotionOfEventProps> {
    constructor(id: number, props: PromotionOfEventProps) {
        super(id, props);
    }
}