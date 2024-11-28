import IUserRepository from "src/domain/common/repositories/user.repository.i";
import { ICommand } from "../common/abstract/command.handler.i";
import PuzzleSetAggregate from "src/domain/puzzle/puzzleset.agg";
import IPuzzleSetRepository from "src/domain/common/repositories/puzzle-set.repository.i";
import UserAggregate from "src/domain/user/user.agg";
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
        const user: UserAggregate = await this.userRepository.getById(param.userJoinEventId);
        if (!user) {
            throw new DomainError('User not found');
        }
        const puzzleSet: PuzzleSetAggregate = await this.puzzleSetRepository.getById(param.puzzleSetOfEventId);
        if (!puzzleSet) {
            throw new DomainError('Puzzle set not found');
        }
        const exchange = user.exchange(puzzleSet);
        await this.userRepository.updateHasPuzzle(user);
        await this.userRepository.addExchangePuzzleSet(user, exchange);
        await this.userRepository.updatePromotion(user);
    }
}