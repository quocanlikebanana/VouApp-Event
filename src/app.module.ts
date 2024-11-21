import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ControllerModule } from './controller/controller.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigModule as MyConfigModule } from './config/config.module';


@Module({
	imports: [
		// Default throttle configuration for all routes
		ThrottlerModule.forRoot([
			{
				ttl: 10000, // Time to live: 10 second
				limit: 10,	// 10 requests 
			},
		]),

		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({

			}),
			global: true,
			inject: [ConfigService],
		}),

		ControllerModule,
		MyConfigModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		}
	],
})

export class AppModule { }
