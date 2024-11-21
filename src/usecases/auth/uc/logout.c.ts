import { ICommand } from "src/usecases/common/usecase/command.i";
import IRefreshTokenRepository from "src/domain/abstract/repositories/refresh-token.repository.i";
import { Injectable } from "@nestjs/common";
import AccountParam from "../param/account.param";

@Injectable()
export default class LogoutCommand implements ICommand<AccountParam, void> {
	constructor(
		private readonly refreshTokenRepository: IRefreshTokenRepository
	) { }

	async execute(param: AccountParam): Promise<void> {
		await this.refreshTokenRepository.clearAllForUser(param.userId);
	}
}