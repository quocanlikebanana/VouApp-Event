import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

@Global()
@Module({
	providers: [
		{
			provide: 'PG_CLIENT',
			useFactory: async () => {
				const client = new Client({
					host: 'localhost',
					port: 5432,
					user: 'postgres',
					password: '123456',
					database: 'regapp',
				});
				await client.connect();
				return client;
			},
		},
	],
	exports: ['PG_CLIENT'],
})
export class RawDatabaseModule { }
