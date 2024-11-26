import { RewardValueType as RewardType } from "../common/types/enums";
import RewardValueObject from "../entities/game/reward.vo";
import PromotionEntity from "../entities/promotion/promotion.entity";
import PuzzleValueObject from "../entities/puzzle/puzzle.vo";
import IPromotionRepository from "../repositories/promotion.repository.i";
import IPuzzleSetRepository from "../repositories/puzzle-set.repository.i";

export default class GetRewardService {
    constructor(
        private readonly promotionRepo: IPromotionRepository,
        private readonly puzzleSetRepo: IPuzzleSetRepository
    ) { }

    public async getReward(reward: RewardValueObject): Promise<PromotionEntity | PuzzleValueObject> {
        switch (reward.props.type) {
            case RewardType.PROMOTION:
                return await this.promotionRepo.getById(reward.id);
            case RewardType.PUZZLE:
                return await this.puzzleSetRepo.getPuzzleById(reward.id);
            default:
                throw new Error("Invalid reward type");
        }
    }
}