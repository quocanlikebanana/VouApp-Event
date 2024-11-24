import { ValueObject } from "src/domain/common/entity/value-object.a";
import { Metric } from "src/domain/common/types/enums";
import RewardValueObject from "./reward.vo";
import { DomainError } from "src/domain/common/errors/domain.err";

type RewardRuleProps = {
    metric: Metric;
    threshold: number;
    possibility: number;
    rewards: RewardValueObject[];
}

export default class RewardRuleValueObject extends ValueObject<RewardRuleProps> {
    protected validate(props: RewardRuleProps): void {
        if (props.threshold < 0) {
            throw new DomainError("Threshold must be positive");
        }
        if (props.possibility < 0) {
            throw new DomainError("Possibility must be positive");
        }
        if (props.possibility > 1) {
            throw new DomainError("Possibility must be less than or equal to 1");
        }
    }
}