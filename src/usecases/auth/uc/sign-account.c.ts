import { ICommand } from "src/usecases/common/usecase/command.i";
import AccountParam from "../param/account.param";
import TokenPairPresenter from "../presenter/tokenpair.presenter";
import TokenService from "src/usecases/common/services/token.service";
import IRefreshTokenRepository from "src/domain/abstract/repositories/refresh-token.repository.i";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class SignAccountCommand implements ICommand<AccountParam, TokenPairPresenter> {
	constructor(
		private readonly tokenService: TokenService,
		private readonly refreshTokenRepository: IRefreshTokenRepository,

	) { }

	async execute(param: AccountParam): Promise<TokenPairPresenter> {
		const tokenPair = this.tokenService.generateTokenPair(param);
		await this.refreshTokenRepository.createNew(tokenPair.refreshToken, param.userId);
		return tokenPair;
	}
}