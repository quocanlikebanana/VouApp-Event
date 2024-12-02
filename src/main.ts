import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './config/all-exceptions.filter';
import { INestApplication, ValidationPipe } from '@nestjs/common';

let app: INestApplication = null;

async function bootstrap() {
	app = await NestFactory.create(AppModule);

	// All validation pipe
	app.useGlobalPipes(new ValidationPipe());

	// All exception handler
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

	// Set global prefix for all routes
	app.setGlobalPrefix('api');

	// Turn on CORS for frontend to use the API,
	// Can be configured to only allow certain domains, if left empty, all domains are allowed
	app.enableCors({
		origin: "*",
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true,
	});

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

export const getApp = async () => {
	return app;
};