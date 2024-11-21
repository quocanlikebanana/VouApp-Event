import { ICommand } from "src/usecases/common/usecase/command.i";
import TokenPairPresenter from "../presenter/tokenpair.presenter";
import TokenService from "src/usecases/common/services/token.service";
import IRefreshTokenRepository from "src/domain/abstract/repositories/refresh-token.repository.i";
import IAuthReader from "src/usecases/abstract/reader/auth.reader.i";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class RefreshTokenCommand implements ICommand<string, TokenPairPresenter | null> {
	constructor(
		private readonly tokenService: TokenService,
		private readonly authReader: IAuthReader,
		private readonly refreshTokenRepository: IRefreshTokenRepository
	) { }

	async execute(param: string): Promise<TokenPairPresenter | null> {
		const data = this.tokenService.verifyRefresh(param);
		if (!data) {
			return null;
		}
		const account = await this.authReader.getAccountById(data.id);
		const tokenPair = this.tokenService.generateTokenPair(account);
		await this.refreshTokenRepository.clearAllForUser(data.id);
		await this.refreshTokenRepository.createNew(tokenPair.refreshToken, data.id);
		return tokenPair;
	}
}