import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import LoginQuery from "src/usecases/auth/uc/login.q";
import AccountPresenter from "src/usecases/auth/presenter/account.presenter";

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly loginQuery: LoginQuery,
	) {
		// Need to specify the fields that are used for username and password
		super({
			usernameField: "email",
			passwordField: "password"
		});
	}

	// If not configured, when the body (of the request) is not {username: string, password: string}, then it will not reach this function as it will be blocked by LocalGuard
	async validate(email: string, password: string): Promise<AccountPresenter> {
		const res = await this.loginQuery.execute({
			email: email,
			password: password
		});
		if (res.isSucess === false || res.account == null) {
			throw new UnauthorizedException(res.message);
		}
		return res.account;
	}
}