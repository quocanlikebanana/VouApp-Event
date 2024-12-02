import IEventRepository from "src/domain/common/repositories/event.repository.i";
import IGameRepository from "src/domain/common/repositories/game.repository.i";
import IPromotionRepository from "src/domain/common/repositories/promotion.repository.i";
import IPuzzleSetRepository from "src/domain/common/repositories/puzzle-set.repository.i";
import IUserRepository from "src/domain/common/repositories/user.repository.i";

export default interface IUnitOfWork {
    get eventRepository(): IEventRepository;
    get userRepository(): IUserRepository;
    get puzzleSetRepository(): IPuzzleSetRepository;
    get gameRepository(): IGameRepository;
    get promotionRepository(): IPromotionRepository;

    /**
     * Executes a function within a (iterative) transaction.
     * NOTE: Do note open the "gate" for too long, for example: send emails, notifications, .... (That's why it is called in each execute method, not at an common abstract method)
     */
    execute<T>(fn: (tx: IUnitOfWork) => Promise<T>): Promise<T>;
}