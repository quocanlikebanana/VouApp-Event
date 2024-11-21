import IRefreshTokenRepository from "src/domain/abstract/repositories/refresh-token.repository.i";
import { PrismaDatabaseService } from "../common/database/database.service";
import EnvConfigService from "src/config/env-config.service";
import { Injectable } from "@nestjs/common";
const moment = require("moment");

@Injectable()
export default class RefreshTokenRepository implements IRefreshTokenRepository {
	constructor(
		private readonly databaseService: PrismaDatabaseService,
		private readonly envConfig: EnvConfigService,
	) { }

	async createNew(refreshToken: string, userId: number): Promise<void> {
		const expiryTime = this.envConfig.getRefreshTokenExpiry();
		const expiryDate = moment().add(expiryTime, "seconds").toDate();
		await this.databaseService.refreshToken.create({
			data: {
				token: refreshToken,
				userId: userId,
				expiryDate: expiryDate,
			},
		});
	}

	async clearAllForUser(userId: number): Promise<void> {
		await this.databaseService.refreshToken.deleteMany({
			where: {
				userId: userId,
			},
		});
	}

	async clearExpired(): Promise<void> {
		await this.databaseService.refreshToken.deleteMany({
			where: {
				expiryDate: {
					lte: new Date(),
				},
			},
		});
	}
}