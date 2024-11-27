import { Entity } from "src/domain/common/entity/entity.a";
import UserHasPuzzleValueObject from "./user-has-puzzle.vo";
import UserExchangePuzzleSetValueObject from "./user-exchange-puzzleset.vo";
import UserJoinGameValueObject from "./user-join-game.vo";
import { DomainError } from "src/domain/common/errors/domain.err";
import PuzzleValueObject from "../puzzle/puzzle.vo";
import PuzzleSetEntity from "../puzzle/puzzleset.entity";
import GameEntity from "../game/game.entity";

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
    userExchangePuzzleSet: UserExchangePuzzleSetValueObject[];
    userJoinGame: UserJoinGameValueObject[];
};

export default class UserEntity extends Entity<UserProps> {
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
        // Reduce and accumulate if the user has the same puzzle multiple times
        const userHasPuzzleMap = props.userHasPuzzle.reduce((acc, item) => {
            // Skip puzzles with quantity 0 
            if (item.props.quantity === 0) {
                return acc;
            }
            else if (item.props.quantity < 0) {
                throw new DomainError("Quantity must be greater than or equal to 0");
            }
            if (acc.has(item.props.puzzle.props.ex_id)) {
                acc.get(item.props.puzzle.props.ex_id).props.quantity += item.props.quantity;
            }
            else {
                acc.set(item.props.puzzle.props.ex_id, item);
            }
            return acc;
        }, new Map<number, UserHasPuzzleValueObject>());
        props.userHasPuzzle = Array.from(userHasPuzzleMap.values());
    }

    removePuzzle(puzzle: PuzzleValueObject, quantity: number): void {
        const puzzleItem = this.props.userHasPuzzle.find(item => item.props.puzzle.props.ex_id === puzzle.props.ex_id);
        if (!puzzleItem) {
            throw new DomainError("User does not have the puzzle");
        }
        if (puzzleItem.props.quantity < quantity) {
            throw new DomainError("User does not have enough puzzles");
        }
        puzzleItem.props.quantity -= quantity;
        if (puzzleItem.props.quantity === 0) {
            this.props.userHasPuzzle = this.props.userHasPuzzle.filter(item => item.props.puzzle.props.ex_id !== puzzle.props.ex_id);
        }
    }

    addPuzzle(puzzle: PuzzleValueObject, quantity: number): void {
        const puzzleItem = this.props.userHasPuzzle.find(item => item.props.puzzle.props.ex_id === puzzle.props.ex_id);
        if (puzzleItem) {
            puzzleItem.props.quantity += quantity;
        }
        else {
            this.props.userHasPuzzle.push(new UserHasPuzzleValueObject({
                puzzle,
                quantity
            }));
        }
    }

    exchange(puzzleSet: PuzzleSetEntity): UserExchangePuzzleSetValueObject {
        // Check if the user has enough puzzles to exchange
        // Map user's puzzles by puzzle ex_id
        const userHasPuzzleMap = this.props.userHasPuzzle.reduce((acc, item) => {
            acc.set(item.props.puzzle.props.ex_id, item);
            return acc;
        }, new Map<number, UserHasPuzzleValueObject>());
        for (const puzzle of puzzleSet.props.puzzles) {
            if (userHasPuzzleMap.has(puzzle.props.ex_id) === false) {
                throw new DomainError("User does not have enough puzzles to exchange");
            }
            const puzzleItem = userHasPuzzleMap.get(puzzle.props.ex_id);
            puzzleItem.props.quantity -= 1;
            if (puzzleItem.props.quantity === 0) {
                userHasPuzzleMap.delete(puzzle.props.ex_id);
            }
        }
        this.props.userHasPuzzle = Array.from(userHasPuzzleMap.values());
        const puzzleSetExchangeOfUser = new UserExchangePuzzleSetValueObject({
            exchangeDate: new Date(),
            puzzleSetOfEventId: puzzleSet.id
        });
        this.props.userExchangePuzzleSet.push(puzzleSetExchangeOfUser);
        return puzzleSetExchangeOfUser;
    }

    joinGame(game: GameEntity): UserJoinGameValueObject {
        const userJoinGame = new UserJoinGameValueObject({
            gameOfEventId: game.id,
            turn: 0,
            histories: [],
        })
        this.props.userJoinGame.push(userJoinGame);
        return userJoinGame;
    }

    takeTurn(game: GameEntity, turn: number): UserJoinGameValueObject {
        const userJoinGame = this.props.userJoinGame.find(item => item.props.gameOfEventId === game.id);
        if (!userJoinGame) {
            throw new DomainError("Cannot add turn, user does not join the game");
        }
        userJoinGame.props.turn += turn;
        return userJoinGame;
    }

    giveTurn(game: GameEntity, turn: number): UserJoinGameValueObject {
        const userJoinGame = this.props.userJoinGame.find(item => item.props.gameOfEventId === game.id);
        if (!userJoinGame) {
            throw new DomainError("Cannot give turn, user does not join the game");
        }
        if (userJoinGame.props.turn < turn) {
            throw new DomainError("User does not have enough turns");
        }
        userJoinGame.props.turn -= turn;
        return userJoinGame;
    }


}