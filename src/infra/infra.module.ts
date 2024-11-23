import { Module } from '@nestjs/common';
import { PrismaDatabaseService } from './common/database/database.service';
import { HashingService } from './common/helper/hasing.service';
import EventRepository from './repositories/event.repository';
import IEventRepository from 'src/domain/contracts/repositories/event.repository.i';

// Dependency Inversion with NestJS: https://trilon.io/blog/dependency-inversion-principle

@Module({
	providers: [
		PrismaDatabaseService,
		HashingService,

		EventRepository,

		{
			provide: IEventRepository,
			useExisting: EventRepository,
		}
	],
	exports: [
		IEventRepository,
	],
})
export class InfraModule { }
