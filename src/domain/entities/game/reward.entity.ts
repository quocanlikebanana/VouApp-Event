import { Entity } from "src/domain/common/entity/entity.a";

export type RewardProps = {
    rewardId: number;
    type: "PROMOTION" | "PUZZLE";
    quantity: number;
};

export default class RewardEntity extends Entity<RewardProps> {
}