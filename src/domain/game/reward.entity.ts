import { Entity } from "src/domain/common/entity/entity.a";
import { DomainError } from "src/domain/common/errors/domain.err";
import { RewardValueType } from "src/domain/common/types/enums";

export type RewardProps = {
    rewardId: string;
    type: RewardValueType;
    quantity: number;
};

export default class RewardEntity extends Entity<RewardProps> {
    protected validate(props: RewardProps): void {
        if (props.quantity < 0) {
            throw new DomainError("Quantity must be positive");
        }
    }

    public static create(reward: RewardProps, id?: string): RewardEntity {
        return new RewardEntity(reward, id);
    }
}