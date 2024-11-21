import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import AccountPresenter from "src/usecases/auth/presenter/account.presenter";
import { Client } from "pg";
import * as bcrypt from "bcrypt";

@Injectable()
export default class TestInjectLocalStrategy extends PassportStrategy(Strategy, 'test-sqli-local') {
	constructor(
		@Inject("PG_CLIENT") private readonly pgClient: Client,
	) {
		// Need to specify the fields that are used for username and password
		super({
			usernameField: "email",
			passwordField: "password"
		});
	}

	// If not configured, when the body (of the request) is not {username: string, password: string}, then it will not reach this function as it will be blocked by LocalGuard
	async validate(email: string, password: string): Promise<AccountPresenter> {
		console.log('Validating user:', email);
		console.log('Password' + password);
		try {
			const query = `SELECT * FROM "User" WHERE email = '${email}'`;
			const result = await this.pgClient.query(query);
			if (result.rowCount === 0) {
				throw new UnauthorizedException("User not found");
			}
			const user = result.rows[0] as {
				email: string;
				password: string;
				firstName: string | null;
				lastName: string | null;
				id: number;
				imageDir: string | null;
				createdAt: Date;
			};

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				throw new UnauthorizedException("Invalid password");
			}
			return {
				userId: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName
			};
		}
		catch (error) {
			console.error('Error:', error);
			return null;
		}
	}
}