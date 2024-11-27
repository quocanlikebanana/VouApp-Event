import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import UserExchangePuzzleSetValueObject from "src/domain/user/user-exchange-puzzleset.vo";
import PuzzleSetPrizeValueObject from "src/domain/puzzle/puzzle-set-prize.vo";
import PuzzleSetEntity from "src/domain/puzzle/puzzleset.entity";
import IPuzzleSetRepository from "src/domain/common/repositories/puzzle-set.repository.i";
import PuzzleSetExchangeService from "src/domain/common/services/puzzle-set-exchange-service";
import UserEntity from "src/domain/user/user.entity";
import { DomainError } from "src/domain/common/errors/domain.err";

export type UserExchangePuzzleSetParam = {
    userJoinEventId: number;
    puzzleSetOfEventId: number;
}

export class UserExchangePuzzleSetCommand implements ICommand<UserExchangePuzzleSetParam, void> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly puzzleSetRepository: IPuzzleSetRepository
    ) { }

    async execute(param: UserExchangePuzzleSetParam): Promise<void> {
        const user: UserEntity = await this.userRepository.getById(param.userJoinEventId);
        if (!user) {
            throw new DomainError('User not found');
        }
        const puzzleSet: PuzzleSetEntity = await this.puzzleSetRepository.getById(param.puzzleSetOfEventId);
        if (!puzzleSet) {
            throw new DomainError('Puzzle set not found');
        }
        const exchange = user.exchange(puzzleSet);
        await this.userRepository.updatePuzzleSet(user);
        await this.userRepository.addPuzzleSetExchange(user, exchange);
    }
}