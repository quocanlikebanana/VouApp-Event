import { Module } from '@nestjs/common';
import { PrismaDatabaseService } from './common/database/database.service';
import EventRepository from './repositories/event.repository';
import IEventRepository from 'src/domain/common/repositories/event.repository.i';
import GameRepository from './repositories/game.repository';
import PromotionRepository from './repositories/promotion.repository';
import PuzzleSetRepository from './repositories/puzzle.repository';
import UserRepository from './repositories/user.repository';
import IGameRepository from 'src/domain/common/repositories/game.repository.i';
import IPromotionRepository from 'src/domain/common/repositories/promotion.repository.i';
import IPuzzleSetRepository from 'src/domain/common/repositories/puzzle-set.repository.i';
import IUserRepository from 'src/domain/common/repositories/user.repository.i';
import { HashingService } from './common/helper/hasing.service';
import { UnitOfWork } from './common/unitofwork/unit-of-work';
import IUnitOfWork from 'src/commands/common/abstract/unit-of-work.i';

// Dependency Inversion with NestJS: https://trilon.io/blog/dependency-inversion-principle

@Module({
	providers: [
		PrismaDatabaseService,
		HashingService,

		EventRepository,
		GameRepository,
		PromotionRepository,
		PuzzleSetRepository,
		UserRepository,

		UnitOfWork,

		{
			provide: IEventRepository,
			useExisting: EventRepository,
		},
		{
			provide: IGameRepository,
			useExisting: GameRepository,
		},
		{
			provide: IPromotionRepository,
			useExisting: PromotionRepository,
		},
		{
			provide: IPuzzleSetRepository,
			useExisting: PuzzleSetRepository,
		},
		{
			provide: IUserRepository,
			useExisting: UserRepository
		},
		{
			provide: IUnitOfWork,
			useExisting: UnitOfWork
		}
	],
	exports: [
		IUnitOfWork
	],
})

export class InfraModule { }
