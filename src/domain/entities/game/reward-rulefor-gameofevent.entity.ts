import { Entity } from "src/domain/common/entity/entity.a";

export type RewardRuleForGameOfEventProps = {
    metric: "TOP" | "RANK" | "SCORE";
    threshold: number;
    possibility: number;
    rewardId: number;
    gameOfEventId: number;
};

export default class RewardRuleForGameOfEventEntity extends Entity<RewardRuleForGameOfEventProps> {
    constructor(id: number, props: RewardRuleForGameOfEventProps) {
        super(id, props);
    }
}