import IGameRepository from "src/domain/common/repositories/game.repository.i";
import { PrismaDatabaseService } from "../common/database/database.service";
import { ExternalGame } from "src/domain/common/types/external.type";
import { EventAggregate } from "src/domain/event/event.agg";
import GameAggregate from "src/domain/game/game.agg";
import { Injectable } from "@nestjs/common";
import RewardRuleValueObject from "src/domain/game/reward-rule.vo";
import { Metric, RewardValueType } from "src/domain/common/types/enums";
import RewardValueObject from "src/domain/game/reward.vo";
import { $Enums } from "@prisma/client";

type GameDataModel = {
    Reward_Rule_GameOfEvents: (
        {
            Reward: {
                id: string;
                type: $Enums.RewardType;
                quantity: number;
                rewardId: string;
                rewardRuleForGameOfEventId: string;
            }[];
        } & {
            id: string;
            metric: $Enums.Metric;
            threshold: number;
            gameOfEventId: string;
            rewardId: string;
        }
    )[];
} & {
    id: string;
    gameId: string;
    gameName: string;
    gameDescription: string | null;
    eventId: string;
};

function toEntity(res: GameDataModel): GameAggregate {
    return GameAggregate.create({
        ex_game: {
            id: res.gameId,
            name: res.gameName,
            description: res.gameDescription,
        },
        rewardRules: res.Reward_Rule_GameOfEvents.map(rule => {
            return new RewardRuleValueObject({
                metric: rule.metric as Metric,
                threshold: rule.threshold,
                rewards: rule.Reward.map(reward => {
                    return new RewardValueObject({
                        rewardId: reward.id,
                        type: reward.type as RewardValueType,
                        quantity: reward.quantity,
                    });
                })
            });
        })
    }, res.id);
}

@Injectable()
export default class GameRepository implements IGameRepository {
    constructor(
        private readonly databaseService: PrismaDatabaseService
    ) { }

    async getById(id: string): Promise<GameAggregate> {
        const res = await this.databaseService.game_Of_Event.findUnique({
            where: {
                id: id
            },
            include: {
                Reward_Rule_GameOfEvents: {
                    include: {
                        Reward: true
                    }
                }
            }
        });
        return toEntity(res);
    }

    async getUserTop(userId: string, gameId: string): Promise<number> {
        const res = await this.databaseService.$queryRaw`
        WITH RankedScores AS (
        SELECT
            ujegoh.ID AS UserJoinEventGameOfEventID,
            ujegoh.Score,
            RANK() OVER (ORDER BY ujegoh.Score DESC) AS Rank
        FROM
            "UserJoinEventJoinGameOfEvent_History" ujegoh
        INNER JOIN
            "UserJoinEvent_Join_GameOfEvent" ujego
            ON ujegoh."UserJoinEventJoinGameOfEventID" = ujego.ID
        INNER JOIN
            "Game_Of_Event" goe
            ON ujego."GameOfEventID" = goe.ID
        WHERE
            goe."GameID" = ${gameId}; -- gameId
        )
        SELECT
            rs.Rank,
            rs.Score
        FROM
            RankedScores rs
        INNER JOIN
            "UserJoinEvent_Join_GameOfEvent" ujego
            ON rs.UserJoinEventGameOfEventID = ujego.ID
        WHERE
            ujego."UserID" = ${userId}; -- userId
        `;
        return res[0]['Score'] as number;
    }

    // https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#create-multiple-records-and-multiple-related-records
    async addGamesOfEvent(event: EventAggregate, games: GameAggregate[]): Promise<void> {
        for (const game of games) {
            await this.databaseService.game_Of_Event.create({
                data: {
                    gameId: game.props.ex_game.id,
                    gameName: game.props.ex_game.name,
                    gameDescription: game.props.ex_game.description,
                    eventId: event.id,
                    Reward_Rule_GameOfEvents: {
                        create: game.props.rewardRules.map(rule => {
                            return {
                                metric: rule.props.metric,
                                threshold: rule.props.threshold,
                                rewardId: rule.props.rewards[0].props.rewardId,
                                Reward: {
                                    create: rule.props.rewards.map(reward => {
                                        return {
                                            rewardId: reward.props.rewardId,
                                            type: reward.props.type,
                                            quantity: reward.props.quantity,
                                        };
                                    })
                                }
                            };
                        })
                    }
                }
            });
        }
    }

    removeGamesOfEvent(event: EventAggregate): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateExternal(exGame: ExternalGame): Promise<void> {
        throw new Error("Method not implemented.");
    }
}