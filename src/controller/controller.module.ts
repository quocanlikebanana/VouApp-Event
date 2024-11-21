import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UsecaseModule } from 'src/usecases/usecase.module';
import LocalStrategy from './common/passport/local.strategy';
import JwtStrategy from './common/passport/jwt.strategy';
import { RawDatabaseModule } from './common/test/raw-db.module';
import { InjectController } from './injection/user.inject.controller';
import TestInjectLocalStrategy from './common/passport/test-sqli.local.strategy';

@Module({
	imports: [UsecaseModule, RawDatabaseModule],
	controllers: [
		UserController,
		AuthController,
		InjectController,
	],
	providers: [
		LocalStrategy,
		JwtStrategy,
		TestInjectLocalStrategy,
	],
})
export class ControllerModule { }
