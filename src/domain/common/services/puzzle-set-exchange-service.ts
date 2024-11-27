import PuzzleSetEntity from "src/domain/puzzle/puzzleset.entity";
import { DomainError } from "../errors/domain.err";
import IPuzzleSetRepository from "../repositories/puzzle-set.repository.i";
import IUserRepository from "../repositories/user.repository.i";
import UserEntity from "src/domain/user/user.entity";

export default class PuzzleSetExchangeService {
    constructor(
    ) { }

    async exchangePuzzleSet(user: UserEntity, puzzleSet: PuzzleSetEntity): Promise<UserEntity> {
        try {
            user.exchange(puzzleSet);
        } catch (e) {
            throw e;
        }
        return user;
    }
}