import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import UserProfilePresenter from 'src/usecases/user/presenter/user-profile.presenter';
import { Client } from 'pg';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('inject/user')
export class InjectController {
	constructor(
		@Inject("PG_CLIENT") private readonly pgClient: Client
	) { }

	@Get('/profile')
	async getUserProfileByIdQuery(@Query('userId') id: string): Promise<UserProfilePresenter | string> {
		console.log('Fetched id:', id);
		try {
			const query = `SELECT * FROM "User" WHERE id = '${id}'`;
			const result = await this.pgClient.query(query);
			const user = result.rows[0];
			return user;
		}
		catch (error) {
			console.error('Error:', error);
			return null;
		}
	}

	@Get('/search')
	async searchUserProfilesByNameQuery(@Query('name') name: string): Promise<any> {
		try {
			const query = `SELECT * FROM "User" WHERE CONCAT("firstName", ' ', "lastName") ILIKE '${name}'`;
			console.log('Executing query:', query);
			const result = await this.pgClient.query(query);
			const users = result.rows;
			return users;
		}
		catch (error) {
			console.error('Error:', error);
			return [];
		}
	}

	// @Get('/profile')
	// async getUserProfileByIdQuery(@Query('userId') id: string): Promise<UserProfilePresenter> {
	// 	const result = await this.pgClient.query(`SELECT * FROM "User" WHERE id = $1`, [id]);
	// 	const user = result.rows[0];
	// 	return user;
	// }

	// @Get('/search')
	// async searchUserProfilesByNameQuery(@Query('name') name: string): Promise<any> {
	// 	const result = await this.pgClient.query(
	// 		`SELECT * FROM "User" WHERE CONCAT("firstName", ' ', "lastName") ILIKE $1`,
	// 		[`%${name}%`]
	// 	);
	// 	const users = result.rows;
	// 	return users;
	// }
}
