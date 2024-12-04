import { ICommand } from "../common/command.handler.i";
import PuzzleSetAggregate from "src/domain/puzzle/puzzleset.agg";
import UserAggregate from "src/domain/user/user.agg";
import { DomainError } from "src/domain/common/errors/domain.err";
import IUnitOfWork from "../common/unit-of-work.i";

export type UserExchangePuzzleSetParam = {
    userJoinEventId: string;
    puzzleSetOfEventId: string;
}

export class UserExchangePuzzleSetCommand implements ICommand<UserExchangePuzzleSetParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: UserExchangePuzzleSetParam): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const user: UserAggregate = await uow.userRepository.getById(param.userJoinEventId);
            if (!user) {
                throw new DomainError('User not found');
            }
            const puzzleSet: PuzzleSetAggregate = await uow.puzzleSetRepository.getById(param.puzzleSetOfEventId);
            if (!puzzleSet) {
                throw new DomainError('Puzzle set not found');
            }
            const exchange = user.exchange(puzzleSet);
            await uow.userRepository.updateHasPuzzle(user);
            await uow.userRepository.addExchangePuzzleSet(user, exchange);
            await uow.userRepository.updatePromotion(user);
        });
    }
}