import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaDatabaseService } from '../database/database.service';
import EventRepository from 'src/infra/repositories/event.repository';
import IEventRepository from 'src/domain/common/repositories/event.repository.i';
import IUserRepository from 'src/domain/common/repositories/user.repository.i';
import IGameRepository from 'src/domain/common/repositories/game.repository.i';
import IPromotionRepository from 'src/domain/common/repositories/promotion.repository.i';
import IPuzzleSetRepository from 'src/domain/common/repositories/puzzle-set.repository.i';
import UserRepository from 'src/infra/repositories/user.repository';
import GameRepository from 'src/infra/repositories/game.repository';
import PromotionRepository from 'src/infra/repositories/promotion.repository';
import PuzzleSetRepository from 'src/infra/repositories/puzzle.repository';

@Injectable()
export class UnitOfWork implements OnModuleDestroy {
	private readonly databaseService: PrismaDatabaseService;

	public readonly eventRepository: IEventRepository;
	public readonly userRepository: IUserRepository;
	public readonly gameRepository: IGameRepository;
	public readonly promotionRepository: IPromotionRepository;
	public readonly puzzleSetRepository: IPuzzleSetRepository;

	constructor() {
		this.databaseService = new PrismaDatabaseService();
		this.eventRepository = new EventRepository(this.databaseService);
		this.userRepository = new UserRepository(this.databaseService);
		this.gameRepository = new GameRepository(this.databaseService);
		this.promotionRepository = new PromotionRepository(this.databaseService);
		this.puzzleSetRepository = new PuzzleSetRepository(this.databaseService);
	}

	/**
	 * Executes a function within a (iterative) transaction.
	 */
	async execute<T>(fn: (tx: UnitOfWork) => Promise<T>): Promise<T> {
		return this.databaseService.$transaction(async (tx) => {
			const uow = new UnitOfWork();
			uow.databaseService.$connect();
			return fn(uow);
		});
	}

	async onModuleDestroy() {
		await this.databaseService.$disconnect();
	}
}
