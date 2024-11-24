import { Entity } from "src/domain/common/entity/entity.a";
import RewardRuleValueObject from "./reward-rule.vo";
import { DomainError } from "src/domain/common/errors/domain.err";

export type GameProps = {
    gameId: number;
    gameName: string;
    gameDescription: string;
    eventId: number;
    rewardRules: RewardRuleValueObject[];
};

export default class GameEntity extends Entity<GameProps> {
    protected validate(props: GameProps): void {
        if (props.rewardRules.length === 0) {
            throw new DomainError("Game must have at least one reward rule");
        }
        const totalPossibility = props.rewardRules.reduce((acc, rule) => acc + rule.props.possibility, 0);
        if (totalPossibility > 1) {
            throw new DomainError("The sum of all possibilities must not greater than 1");
        }
    }
}