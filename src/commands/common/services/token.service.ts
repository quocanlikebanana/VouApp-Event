import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import EnvConfigService from "src/config/env-config.service";
import AccountParam from "src/usecases/auth/param/account.param";
import AccountPresenter from "src/usecases/auth/presenter/account.presenter";
import TokenPairPresenter from "src/usecases/auth/presenter/tokenpair.presenter";

@Injectable()
export default class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly envConfig: EnvConfigService,
	) { }

	generateTokenPair(account: AccountPresenter | AccountParam): TokenPairPresenter {
		const accessToken = this.jwtService.sign(account, {
			expiresIn: this.envConfig.getAccessTokenExpiry(),
			secret: this.envConfig.getAccessSecret(),
		});
		const refreshToken = this.jwtService.sign({ id: account.userId }, {
			expiresIn: this.envConfig.getRefreshTokenExpiry(),
			secret: this.envConfig.getRefreshSecret(),
		});
		return {
			accessToken,
			refreshToken
		};
	}

	verifyAccess(accessToken: string): AccountParam | null {
		try {
			const data = this.jwtService.verify<AccountParam>(
				accessToken,
				{
					secret: this.envConfig.getAccessSecret()
				}
			);
			return data;
		} catch (error) {
			return null;
		}
	}

	verifyRefresh(refreshToken: string): { id: number } | null {
		try {
			const data = this.jwtService.verify<{ id: number }>(
				refreshToken,
				{
					secret: this.envConfig.getRefreshSecret()
				}
			);
			return data;
		} catch (error) {
			return null;
		}
	}
}