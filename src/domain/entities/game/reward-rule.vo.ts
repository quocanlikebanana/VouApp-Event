import { ValueObject } from "src/domain/common/entity/value-object.a";
import { Metric } from "src/domain/common/types/enums";
import RewardValueObject from "./reward.vo";
import { DomainError } from "src/domain/common/errors/domain.err";

export type RewardRuleProps = {
    metric: Metric;
    threshold: number;
    rewards: RewardValueObject[];
}

export default class RewardRuleValueObject extends ValueObject<RewardRuleProps> {
    protected validate(props: RewardRuleProps): void {
        if (props.threshold < 0) {
            throw new DomainError("Threshold must be positive");
        }
    }
}