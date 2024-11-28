import UserJoinGameHistoryValueObject from "./user-join-game-history.vo";
import RewardValueObject from "../game/reward.vo";
import { Entity } from "../common/entity/entity.a";
import GameAggregate from "../game/game.agg";

export type UserJoinGameProps = {
    turn: number;
    gameOfEventId: number;
    histories: UserJoinGameHistoryValueObject[];
    _rank?: {
        top: number;
        rewards?: RewardValueObject[];
    };
};

export default class UserJoinGameEntity extends Entity<UserJoinGameProps> {
    protected validate(props: UserJoinGameProps): void {
        if (props.turn < 0) {
            throw new Error("Turn must be greater than or equal to 0.");
        }
    }

    isEvaluated(): boolean {
        return this.props._rank != null;
    }

    addHistory(history: UserJoinGameHistoryValueObject): void {
        this.props.histories.push(history);
    }

    addTurn(turn: number): void {
        this.props.turn += turn;
    }

    useTurn(turn: number): void {
        if (this.props.turn < turn) {
            throw new Error("User does not have enough turns");
        }
        this.props.turn -= turn;
    }

    evaluateRank(game: GameAggregate, top: number): RewardValueObject[] | null {
        const rewards = game.checkTopReward(top);
        this.props._rank = {
            top,
            rewards,
        };
        return rewards;
    }
}