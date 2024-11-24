import { ICommandHandler } from "src/commands/common/command.handler.i";
import IEventRepository from "src/domain/repositories/event.repository.i";
import { EventEntity } from "src/domain/entities/event/event.entity";
import { Metric } from "src/domain/common/types/enums";

type PuzzleSetPrize = {
	promotion: Promotion;
	quantity: number;
}

type Puzzle = {
	puzzleId: number;
	puzzleName: string;
	puzzleDescription: string;
}

type PuzzleSet = {
	puzzleSetId: number;
	puzzleSetName: string;
	puzzleSetDescription: string;
	puzzles: Puzzle[];
	prizes: PuzzleSetPrize[];
}

type Promotion = {
	promotionId: number;
	promotionName: string;
	promotionDescription: string;
	quantity: number;
}

type Reward = {
	quantity: number;
	value: Promotion | Puzzle;
}

type RewardRule = {
	metric: Metric;
	threshold: number;
	possibility: number;
	rewards: Reward;
}

type Game = {
	gameId: number;
	gamName: string;
	gameDescription: string;
	rewardRule: RewardRule[];
}

type CreateEventParam = {
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	partner: {
		partnerId: number;
		partnerName: string;
	}
	games: Game[];
	promotions: Promotion[];
	puzzleSets: PuzzleSet[];
}

export default class CreateEventHandler implements ICommandHandler<CreateEventParam, void> {
	constructor(
		private readonly eventRepository: IEventRepository
	) { }

	async execute(param: CreateEventParam): Promise<void> {
		const entity = EventEntity.create({
			name: param.name,
			description: param.description,
			startDate: param.startDate,
			endDate: param.endDate,
			partner: param.partner,
		});
		await this.eventRepository.createNew(entity);
	}
}