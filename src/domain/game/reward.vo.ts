import { Entity } from "src/domain/common/entity/entity.a";
import { DomainError } from "src/domain/common/errors/domain.err";
import { RewardValueType } from "src/domain/common/types/enums";

export type RewardProps = {
    rewardId: string;
    type: RewardValueType;
    quantity: number;
};

export default class RewardValueObject extends Entity<RewardProps> {
    protected validate(props: RewardProps): void {
        if (props.quantity < 0) {
            throw new DomainError("Quantity must be positive");
        }
    }
}