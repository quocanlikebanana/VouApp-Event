import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { ExternalUser } from "src/domain/common/types/external.type";
import UserExchangePuzzleSetValueObject from "src/domain/user/user-exchange-puzzleset.vo";
import UserJoinGameHistoryValueObject from "src/domain/user/user-join-game-history.vo";
import UserJoinGameEntity from "src/domain/user/user-join-game.entity";
import UserAggregate from "src/domain/user/user.agg";
import { PrismaDatabaseService } from "../common/database/prismadb.service";
import UserHasPuzzleEntity from "src/domain/user/user-has-puzzle.entity";
import UserHasPromotionValueObject from "src/domain/user/user-has-promotion.vo";
import RewardEntity from "src/domain/game/reward.entity";
import { RewardValueType } from "src/domain/common/types/enums";
import { $Enums } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { DomainError } from "src/domain/common/errors/domain.err";

type UserDataModel = {
    UserJoinEvent_Has_Puzzles: {
        id: string;
        quantity: number;
        puzzleOfEventId: string;
        userJoinEventId: string;
    }[];
    UserJoinEvent_Exchange_PuzzleSetOfEvents: {
        id: string;
        exchangeDate: Date;
        puzzleSet_Of_EventId: string;
        userJoinEventId: string;
    }[];
    UserJoinEvent_Join_GameOfEvent: ({
        UserJoinEventJoinGameOfEvent_History: ({
            UserJoinEventJoinGameOfEventHistory_Has_ScoreReward: ({
                Reward: {
                    id: string;
                    quantity: number;
                    rewardId: string;
                    type: $Enums.RewardType;
                    rewardRuleForGameOfEventId: string;
                };
            } & {
                id: string;
                userJoinEventJoinGameOfEventHistoryId: string;
                rewardId: string;
            })[];
        } & {
            id: string;
            date: Date;
            score: number;
            userJoinEventJoinGameOfEventId: string;
        })[];
        UserJoinEventJoinGameOfEvent_Has_TopReward: ({
            Reward: {
                id: string;
                quantity: number;
                rewardId: string;
                type: $Enums.RewardType;
                rewardRuleForGameOfEventId: string;
            };
        } & {
            id: string;
            userJoinEventJoinGameOfEventId: string;
            rewardId: string;
        })[];
    } & {
        id: string;
        turn: number;
        gameOfEventId: string;
        userJoinEventId: string;
        top: number | null;
    })[];
    UserJoinEvent_Has_PromotionOfEvent: {
        id: string;
        quantity: number;
        promotionOfEventId: string;
        userJoinEventId: string;
    }[];
} & {
    id: string;
    userId: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userFacebook: string | null;
    joinDate: Date;
    eventId: string;
}

function toEntity(user: UserDataModel): UserAggregate {
    return UserAggregate.create({
        ex_user: {
            id: user.id,
            firstName: user.userFirstName,
            lastName: user.userLastName,
            email: user.userEmail,
            facebook: user.userFacebook
        },
        joinDate: user.joinDate,
        eventId: user.eventId,
        userHasPuzzle: user.UserJoinEvent_Has_Puzzles.map(userHasPuzzle => {
            return UserHasPuzzleEntity.create({
                puzzleOfEventId: userHasPuzzle.puzzleOfEventId,
                quantity: userHasPuzzle.quantity,
            });
        }),
        userHasPromotion: user.UserJoinEvent_Has_PromotionOfEvent.map(userHasPromotion => {
            return new UserHasPromotionValueObject({
                promotionOfEventId: userHasPromotion.promotionOfEventId,
                quantity: userHasPromotion.quantity
            });
        }),
        userExchangePuzzleSet: user.UserJoinEvent_Exchange_PuzzleSetOfEvents.map(userExchangePuzzleSet => {
            return new UserExchangePuzzleSetValueObject({
                exchangeDate: userExchangePuzzleSet.exchangeDate,
                puzzleSetOfEventId: userExchangePuzzleSet.puzzleSet_Of_EventId
            });
        }),
        userJoinGame: user.UserJoinEvent_Join_GameOfEvent.map(userJoinGame => UserJoinGameEntity.create({
            turn: userJoinGame.turn,
            gameOfEventId: userJoinGame.gameOfEventId,
            histories: userJoinGame.UserJoinEventJoinGameOfEvent_History.map(userJoinGameHistory => {
                return new UserJoinGameHistoryValueObject({
                    date: userJoinGameHistory.date,
                    score: userJoinGameHistory.score,
                    rewards: userJoinGameHistory.UserJoinEventJoinGameOfEventHistory_Has_ScoreReward.map(reward => {
                        return RewardEntity.create({
                            rewardId: reward.Reward.rewardId,
                            type: reward.Reward.type as RewardValueType,
                            quantity: reward.Reward.quantity
                        });
                    })
                });
            }),
            _rank: userJoinGame.UserJoinEventJoinGameOfEvent_Has_TopReward ?
                {
                    top: userJoinGame.top,
                    rewards: userJoinGame.UserJoinEventJoinGameOfEvent_Has_TopReward.map(reward => {
                        return RewardEntity.create({
                            quantity: reward.Reward.quantity,
                            rewardId: reward.Reward.rewardId,
                            type: reward.Reward.type as RewardValueType
                        });
                    })
                } : null
        }))
    }, user.id);
}

@Injectable()
export default class UserRepository implements IUserRepository {
    constructor(
        private readonly databaseService: PrismaDatabaseService
    ) { }

    async getById(id: string): Promise<UserAggregate> {
        const user = await this.databaseService.user_Join_Event.findUnique({
            where: {
                id
            },
            include: {
                UserJoinEvent_Has_Puzzles: true,
                UserJoinEvent_Has_PromotionOfEvent: true,
                UserJoinEvent_Exchange_PuzzleSetOfEvents: true,
                UserJoinEvent_Join_GameOfEvent: {
                    include: {
                        UserJoinEventJoinGameOfEvent_History: {
                            include: {
                                UserJoinEventJoinGameOfEventHistory_Has_ScoreReward: {
                                    include: {
                                        Reward: true
                                    }
                                }
                            }
                        },
                        UserJoinEventJoinGameOfEvent_Has_TopReward: {
                            include: {
                                Reward: true
                            }
                        }
                    }
                }
            }
        });
        if (!user) {
            throw new DomainError('User not found');
        }
        return toEntity(user);
    }

    async create(user: UserAggregate): Promise<void> {
        await this.databaseService.user_Join_Event.create({
            data: {
                id: user.id,
                userId: user.props.ex_user.id,
                userFirstName: user.props.ex_user.firstName,
                userLastName: user.props.ex_user.lastName,
                userEmail: user.props.ex_user.email,
                userFacebook: user.props.ex_user.facebook,
                joinDate: user.props.joinDate,
                eventId: user.props.eventId,
                UserJoinEvent_Has_Puzzles: {
                    create: user.props.userHasPuzzle.map(puzzle => ({
                        puzzleOfEventId: puzzle.props.puzzleOfEventId,
                        quantity: puzzle.props.quantity
                    }))
                },
                UserJoinEvent_Has_PromotionOfEvent: {
                    create: user.props.userHasPromotion.map(promotion => ({
                        promotionOfEventId: promotion.props.promotionOfEventId,
                        quantity: promotion.props.quantity
                    }))
                },
                UserJoinEvent_Exchange_PuzzleSetOfEvents: {
                    create: user.props.userExchangePuzzleSet.map(exchange => ({
                        exchangeDate: exchange.props.exchangeDate,
                        puzzleSet_Of_EventId: exchange.props.puzzleSetOfEventId,
                    }))
                },
                UserJoinEvent_Join_GameOfEvent: {
                    create: user.props.userJoinGame.map(joinGame => ({
                        id: joinGame.id,
                        turn: joinGame.props.turn,
                        gameOfEventId: joinGame.props.gameOfEventId,
                        top: joinGame.props._rank?.top || null,
                        UserJoinEventJoinGameOfEvent_History: {
                            create: joinGame.props.histories.map(history => ({
                                date: history.props.date,
                                score: history.props.score,
                                UserJoinEventJoinGameOfEventHistory_Has_ScoreReward: {
                                    create: history.props.rewards.map(reward => ({
                                        rewardId: reward.props.rewardId,
                                        quantity: reward.props.quantity,
                                        type: reward.props.type as $Enums.RewardType
                                    }))
                                }
                            }))
                        },
                        UserJoinEventJoinGameOfEvent_Has_TopReward: {
                            create: joinGame.props._rank?.rewards.map(reward => ({
                                rewardId: reward.props.rewardId,
                                quantity: reward.props.quantity,
                                type: reward.props.type as $Enums.RewardType
                            })) || []
                        }
                    }))
                }
            }
        });
    }

    async remove(user: UserAggregate): Promise<void> {
        await this.databaseService.user_Join_Event.delete({
            where: {
                id: user.id
            }
        });
    }

    async updateExternal(exUser: ExternalUser): Promise<void> {
        await this.databaseService.user_Join_Event.updateMany({
            where: {
                userId: exUser.id
            },
            data: {
                userFirstName: exUser.firstName,
                userLastName: exUser.lastName,
                userEmail: exUser.email,
                userFacebook: exUser.facebook
            }
        });
    }

    async updateHasPuzzle(user: UserAggregate): Promise<void> {
        await this.databaseService.userJoinEvent_Has_PuzzleOfEvent.deleteMany({
            where: {
                userJoinEventId: user.id
            }
        });
        await this.databaseService.userJoinEvent_Has_PuzzleOfEvent.createMany({
            data: user.props.userHasPuzzle.map(puzzle => ({
                id: puzzle.id,
                quantity: puzzle.props.quantity,
                puzzleOfEventId: puzzle.props.puzzleOfEventId,
                userJoinEventId: user.id
            }))
        });
    }

    async addExchangePuzzleSet(user: UserAggregate, puzzleSetExchangeOfUser: UserExchangePuzzleSetValueObject): Promise<void> {
        await this.databaseService.userJoinEvent_Exchange_PuzzleSetOfEvent.create({
            data: {
                exchangeDate: puzzleSetExchangeOfUser.props.exchangeDate,
                puzzleSet_Of_EventId: puzzleSetExchangeOfUser.props.puzzleSetOfEventId,
                userJoinEventId: user.id
            }
        });
    }

    async addJoinGame(user: UserAggregate, userJoinGame: UserJoinGameEntity): Promise<void> {
        await this.databaseService.userJoinEvent_Join_GameOfEvent.create({
            data: {
                turn: userJoinGame.props.turn,
                gameOfEventId: userJoinGame.props.gameOfEventId,
                userJoinEventId: user.id,
                top: userJoinGame.props._rank?.top || null,
                UserJoinEventJoinGameOfEvent_History: {
                    create: userJoinGame.props.histories.map(history => ({
                        date: history.props.date,
                        score: history.props.score,
                        UserJoinEventJoinGameOfEventHistory_Has_ScoreReward: {
                            create: history.props.rewards.map(reward => ({
                                rewardId: reward.props.rewardId
                            }))
                        }
                    }))
                },
                UserJoinEventJoinGameOfEvent_Has_TopReward: {
                    create: userJoinGame.props._rank?.rewards.map(reward => ({
                        rewardId: reward.props.rewardId
                    })) || []
                }
            }
        });
    }

    async updateJoinGame(user: UserAggregate, userJoinGame: UserJoinGameEntity): Promise<void> {
        await this.databaseService.userJoinEvent_Join_GameOfEvent.update({
            where: {
                id: userJoinGame.id
            },
            data: {
                turn: userJoinGame.props.turn,
                gameOfEventId: userJoinGame.props.gameOfEventId,
                userJoinEventId: user.id,
                top: userJoinGame.props._rank?.top || null,
                UserJoinEventJoinGameOfEvent_History: {
                    deleteMany: {},
                    create: userJoinGame.props.histories.map(history => ({
                        date: history.props.date,
                        score: history.props.score,
                        UserJoinEventJoinGameOfEventHistory_Has_ScoreReward: {
                            create: history.props.rewards.map(reward => ({
                                rewardId: reward.props.rewardId,
                                quantity: reward.props.quantity,
                                type: reward.props.type as $Enums.RewardType
                            }))
                        }
                    }))
                },
                UserJoinEventJoinGameOfEvent_Has_TopReward: {
                    deleteMany: {},
                    create: userJoinGame.props._rank?.rewards.map(reward => ({
                        rewardId: reward.props.rewardId,
                        quantity: reward.props.quantity,
                        type: reward.props.type as $Enums.RewardType
                    })) || []
                }
            }
        });
    }

    async addJoinGameHistory(user: UserAggregate, UserJoinGameHistory: UserJoinGameHistoryValueObject): Promise<void> {
        await this.databaseService.userJoinEventJoinGameOfEvent_History.create({
            data: {
                date: UserJoinGameHistory.props.date,
                score: UserJoinGameHistory.props.score,
                userJoinEventJoinGameOfEventId: user.props.userJoinGame.find(joinGame =>
                    joinGame.props.histories.some(history => history === UserJoinGameHistory)
                )?.id,
                UserJoinEventJoinGameOfEventHistory_Has_ScoreReward: {
                    create: UserJoinGameHistory.props.rewards.map(reward => ({
                        rewardId: reward.props.rewardId,
                        quantity: reward.props.quantity,
                        type: reward.props.type as $Enums.RewardType
                    }))
                }
            }
        });
    }

    async updatePromotion(user: UserAggregate): Promise<void> {
        await this.databaseService.userJoinEvent_Has_PromotionOfEvent.deleteMany({
            where: {
                userJoinEventId: user.id
            }
        });
        await this.databaseService.userJoinEvent_Has_PromotionOfEvent.createMany({
            data: user.props.userHasPromotion.map(promotion => ({
                quantity: promotion.props.quantity,
                promotionOfEventId: promotion.props.promotionOfEventId,
                userJoinEventId: user.id
            }))
        });
    }
}

