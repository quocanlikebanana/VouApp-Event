import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import IRefreshTokenRepository from "src/domain/abstract/repositories/refresh-token.repository.i";
import { ICommand } from "src/usecases/common/usecase/command.i";

@Injectable()
export default class CronScanTokenCommand implements ICommand<void, void> {
	constructor(private readonly refreshTokenRepository: IRefreshTokenRepository) { }

	@Cron(CronExpression.EVERY_DAY_AT_10AM)
	async execute(): Promise<void> {
		await this.refreshTokenRepository.clearExpired();
	}
}