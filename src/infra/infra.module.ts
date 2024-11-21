import { Module } from '@nestjs/common';
import UserReader from './reader/user.reader';
import { UserRepository } from './repositories/user.repository';
import { PrismaDatabaseService } from './common/database/database.service';
import { HashingService } from './common/helper/hasing.service';
import AuthReader from './reader/auth.reader';
import { IUserReader } from 'src/usecases/abstract/reader/user.reader.i';
import IAuthReader from 'src/usecases/abstract/reader/auth.reader.i';
import IUserRepository from 'src/domain/abstract/repositories/user.repository.i';
import IRefreshTokenRepository from 'src/domain/abstract/repositories/refresh-token.repository.i';
import RefreshTokenRepository from './repositories/refresh-token.repository';

@Module({
	providers: [
		PrismaDatabaseService,
		HashingService,


		// Readers
		{
			provide: IUserReader,
			useClass: UserReader
		},
		{
			provide: IAuthReader,
			useClass: AuthReader
		},

		// Repositories
		{
			provide: IUserRepository,
			useClass: UserRepository
		},
		{
			provide: IRefreshTokenRepository,
			useClass: RefreshTokenRepository,
		},
	],
	exports: [
		IAuthReader,
		IUserReader,

		IUserRepository,
		IRefreshTokenRepository,
	],
})
export class InfraModule { }
