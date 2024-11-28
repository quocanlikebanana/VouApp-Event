import { Entity } from "src/domain/common/entity/entity.a";
import RewardRuleValueObject from "./reward-rule.vo";
import { DomainError } from "src/domain/common/errors/domain.err";
import RewardValueObject from "./reward.vo";
import { Metric } from "src/domain/common/types/enums";
import AggregateRoot from "../common/entity/aggregate.a";

export type GameProps = {
    ex_game: {
        id: number;
        name: string;
        description: string;
    }
    rewardRules: RewardRuleValueObject[];
};

export default class GameAggregate extends AggregateRoot<GameProps> {
    protected validate(props: GameProps): void {
        if (props.rewardRules.length === 0) {
            throw new DomainError("Game must have at least one reward rule");
        }
    }

    private checkReward(metric: Metric, value: number): RewardValueObject[] | null {
        let rewards: RewardValueObject[] | null = null;
        const filteredRules = this.props.rewardRules.filter(rule => rule.props.metric === metric);
        // ASC for TOP, DESC for SCORE
        const sortedRules = filteredRules.sort(
            (a, b) => metric === Metric.TOP ?
                a.props.threshold - b.props.threshold :
                b.props.threshold - a.props.threshold);
        for (const rule of sortedRules) {
            if ((metric === Metric.TOP && value <= rule.props.threshold) ||
                (metric === Metric.SCORE && value >= rule.props.threshold)) {
                rewards = rule.props.rewards;
                break;
            }
        }
        return rewards;
    }

    checkTopReward(top: number): RewardValueObject[] | null {
        return this.checkReward(Metric.TOP, top);
    }

    checkScoreReward(score: number): RewardValueObject[] | null {
        return this.checkReward(Metric.SCORE, score);
    }

    updateExternal(gameName: string, gameDescription: string) {
        this.props.ex_game.name = gameName;
        this.props.ex_game.description = gameDescription;
    }
}