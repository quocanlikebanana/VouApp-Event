import UserHasPuzzleValueObject from "./user-has-puzzle.vo";
import UserExchangePuzzleSetValueObject from "./user-exchange-puzzleset.vo";
import UserJoinGameEntity from "./user-join-game.entity";
import { DomainError } from "src/domain/common/errors/domain.err";
import PuzzleSetAggregate from "../puzzle/puzzleset.agg";
import GameAggregate from "../game/game.agg";
import UserJoinGameHistoryValueObject from "./user-join-game-history.vo";
import UserHasPromotionValueObject from "./user-has-promotion.vo";
import PuzzleEntity from "../puzzle/puzzle.entity";
import PromotionAggregate from "../promotion/promotion.agg";
import AggregateRoot from "../common/entity/aggregate.a";

export type UserProps = {
    ex_user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        facebook: string;
    }
    eventId: number;
    joinDate: Date;
    userHasPuzzle: UserHasPuzzleValueObject[];
    userHasPromotion: UserHasPromotionValueObject[];
    userExchangePuzzleSet: UserExchangePuzzleSetValueObject[];
    userJoinGame: UserJoinGameEntity[];
};

export default class UserAggregate extends AggregateRoot<UserProps> {
    protected validate(props: UserProps): void {
        // Check user join date
        const now = new Date();
        if (props.joinDate > now) {
            throw new DomainError("Join date must be in the past");
        }
        // Check if the user join the same game multiple times
        const gamgeIdSet = new Set<number>();
        for (const item of props.userJoinGame) {
            if (gamgeIdSet.has(item.props.gameOfEventId)) {
                throw new DomainError("User can only join a game once");
            }
            gamgeIdSet.add(item.props.gameOfEventId);
        }
        // Check if user has duplicate puzzles
        const puzzleIdSet = new Set<number>();
        for (const item of props.userHasPuzzle) {
            if (puzzleIdSet.has(item.props.puzzleOfEventId)) {
                throw new DomainError("User cannot have duplicate puzzles");
            }
            puzzleIdSet.add(item.props.puzzleOfEventId);
        }
        // Check if user has duplicate promotions
        const promotionIdSet = new Set<number>();
        for (const item of props.userHasPromotion) {
            if (promotionIdSet.has(item.props.promotionOfEventId)) {
                throw new DomainError("User cannot have duplicate promotions");
            }
            promotionIdSet.add(item.props.promotionOfEventId);
        }
    }

    addPromotion(promotion: PromotionAggregate, quantity: number): void {
        const promotionItemIndex = this.props.userHasPromotion.findIndex(item => item.props.promotionOfEventId === promotion.id);
        const promotionItem = this.props.userHasPromotion[promotionItemIndex];
        if (promotionItemIndex !== -1) {
            this.props.userHasPromotion[promotionItemIndex] = promotionItem.recreate({
                quantity: promotionItem.props.quantity + quantity
            });
        }
        else {
            this.props.userHasPromotion.push(new UserHasPromotionValueObject({
                promotionOfEventId: this.props.eventId,
                quantity: quantity,
            }));
        }
    }

    removePromotion(promotion: PromotionAggregate, quantity: number): void {
        const promotionItemIndex = this.props.userHasPromotion.findIndex(item => item.props.promotionOfEventId === promotion.id);
        if (promotionItemIndex === -1) {
            throw new DomainError("User does not have the promotion");
        }
        const promotionItem = this.props.userHasPromotion[promotionItemIndex];
        if (promotionItem.props.quantity < quantity) {
            throw new DomainError("User does not have enough promotions");
        }
        this.props.userHasPromotion[promotionItemIndex] = promotionItem.recreate({
            quantity: promotionItem.props.quantity - quantity
        });
        if (promotionItem.props.quantity === 0) {
            this.props.userHasPromotion = this.props.userHasPromotion.filter(item => item.props.promotionOfEventId !== promotion.id);
        }
    }

    addPuzzle(puzzle: PuzzleEntity, quantity: number): void {
        const puzzleItemIndex = this.props.userHasPuzzle.findIndex(item => item.props.puzzleOfEventId === puzzle.id);
        const puzzleItem = this.props.userHasPuzzle[puzzleItemIndex];
        if (puzzleItemIndex !== -1) {
            this.props.userHasPuzzle[puzzleItemIndex] = puzzleItem.recreate({
                quantity: puzzleItem.props.quantity + quantity
            });
        }
        else {
            this.props.userHasPuzzle.push(new UserHasPuzzleValueObject({
                puzzleOfEventId: puzzle.id,
                quantity,
            }));
        }
    }

    removePuzzle(puzzle: PuzzleEntity, quantity: number): void {
        const puzzleItemIndex = this.props.userHasPuzzle.findIndex(item => item.props.puzzleOfEventId === puzzle.id);
        if (puzzleItemIndex === -1) {
            throw new DomainError("User does not have the puzzle");
        }
        const puzzleItem = this.props.userHasPuzzle[puzzleItemIndex];
        if (puzzleItem.props.quantity < quantity) {
            throw new DomainError("User does not have enough puzzles");
        }
        this.props.userHasPuzzle[puzzleItemIndex] = puzzleItem.recreate({
            quantity: puzzleItem.props.quantity - quantity
        });
        if (puzzleItem.props.quantity === 0) {
            this.props.userHasPuzzle = this.props.userHasPuzzle.filter(item => item.props.puzzleOfEventId !== puzzle.id);
        }
    }

    exchange(puzzleSet: PuzzleSetAggregate): UserExchangePuzzleSetValueObject {
        for (const puzzle of puzzleSet.props.puzzles) {
            this.removePuzzle(puzzle, 1);
        }
        const puzzleSetExchangeOfUser = new UserExchangePuzzleSetValueObject({
            exchangeDate: new Date(),
            puzzleSetOfEventId: puzzleSet.id
        });
        this.props.userExchangePuzzleSet.push(puzzleSetExchangeOfUser);
        // const puzzleReward = puzzleSet.getpuzzleSetPrize();
        // for (const reward of puzzleReward) {
        //     this.addPromotion(reward.props.promotion, reward.props.quantity);
        // }
        // DomainEventDispatcher.dispatch({});
        return puzzleSetExchangeOfUser;
    }

    joinGame(game: GameAggregate): UserJoinGameEntity {
        const userJoinGame = new UserJoinGameEntity({
            gameOfEventId: game.id,
            turn: 0,
            histories: [],
            _rank: null,
        });
        this.props.userJoinGame.push(userJoinGame);
        return userJoinGame;
    }

    private getGame(game: GameAggregate): UserJoinGameEntity {
        const userJoinGame = this.props.userJoinGame.find(item => item.props.gameOfEventId === game.id);
        if (!userJoinGame) {
            throw new DomainError("User does not join the game");
        }
        return userJoinGame;
    }

    evaluateGame(game: GameAggregate, top: number): UserJoinGameEntity {
        const userJoinGame = this.getGame(game);
        if (!userJoinGame) {
            throw new DomainError("User does not join the game");
        }
        userJoinGame.evaluateRank(game, top);
        // DomainEventDispatcher.dispatch({}); // Add promotion
        return userJoinGame;
    }

    takeTurn(game: GameAggregate, turn: number): UserJoinGameEntity {
        const userJoinGame = this.getGame(game);
        userJoinGame.addTurn(turn);
        return userJoinGame;
    }

    giveTurn(game: GameAggregate, turn: number): UserJoinGameEntity {
        const userJoinGame = this.getGame(game);
        userJoinGame.useTurn(turn);
        return userJoinGame;
    }

    playGame(game: GameAggregate): UserJoinGameEntity {
        const userJoinGame = this.getGame(game);
        if (userJoinGame.props.turn === 0) {
            throw new DomainError("User does not have enough turns");
        }
        userJoinGame.useTurn(1);
        return userJoinGame;
    }

    saveGameScore(game: GameAggregate, score: number): UserJoinGameHistoryValueObject {
        const userJoinGame = this.getGame(game);
        const scoreReward = game.checkScoreReward(score);
        const now = new Date();
        const history = new UserJoinGameHistoryValueObject({
            date: now,
            score: score,
            rewards: scoreReward,
        });
        userJoinGame.addHistory(history);
        return history;
    }
}