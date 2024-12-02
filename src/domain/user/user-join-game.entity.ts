import UserJoinGameHistoryValueObject from "./user-join-game-history.vo";
import RewardEntity from "../game/reward.entity";
import { Entity } from "../common/entity/entity.a";
import GameAggregate from "../game/game.agg";

export type UserJoinGameProps = {
    turn: number;
    gameOfEventId: string;
    histories: UserJoinGameHistoryValueObject[];
    _rank?: {
        top: number;
        rewards?: RewardEntity[];
    };
};

export default class UserJoinGameEntity extends Entity<UserJoinGameProps> {
    protected validate(props: UserJoinGameProps): void {
        if (props.turn < 0) {
            throw new Error("Turn must be greater than or equal to 0.");
        }
    }

    public static create(props: UserJoinGameProps, id?: string): UserJoinGameEntity {
        return new UserJoinGameEntity(props, id);
    }

    isEvaluated(): boolean {
        return this.props._rank != null;
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

    evaluateScore(game: GameAggregate, score: number): RewardEntity[] | null {
        const rewards = game.checkScoreReward(score);
        const now = new Date();
        const history = new UserJoinGameHistoryValueObject({
            date: now,
            score: score,
            rewards: rewards,
        });
        this.props.histories.push(history);
        return rewards;
    }

    evaluateRank(game: GameAggregate, top: number): RewardEntity[] | null {
        const rewards = game.checkTopReward(top);
        this.props._rank = {
            top,
            rewards,
        };
        return rewards;
    }
}