import { Entity } from "src/domain/common/entity/entity.a";

export type PromotionOfEventForPuzzleSetOfEventProps = {
    quantity: number;
    puzzleSetOfEventId: number;
    promotionOfEventId: number;
};

export default class PromotionOfEventForPuzzleSetOfEventEntity extends Entity<PromotionOfEventForPuzzleSetOfEventProps> {
}