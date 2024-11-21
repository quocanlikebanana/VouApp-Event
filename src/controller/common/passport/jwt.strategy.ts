import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import EnvConfigService from "src/config/env-config.service";
import AccountPresenter from "src/usecases/auth/presenter/account.presenter";
import VerifyAccountQuery from "src/usecases/auth/uc/verify-account.q";

// Uses Access Token to validate user
@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		envConfigService: EnvConfigService,
		private readonly verifyAccoutnQuery: VerifyAccountQuery
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false, // Handles expiration (by not ignore it) in the guard for us
			secretOrKey: envConfigService.getAccessSecret(),
		});
	}

	async validate(payload: AccountPresenter): Promise<AccountPresenter> {
		const id = payload.userId;
		const isExists = await this.verifyAccoutnQuery.execute(id);
		if (!isExists) return null;
		return payload;
	}
}