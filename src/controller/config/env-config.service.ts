import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config"

@Injectable()
export default class EnvConfigService {
	private readonly accessSecret: string;
	private readonly refreshSecret: string;
	private readonly accessTokenExpiry: number;
	private readonly refreshTokenExpiry: number;

	constructor(
		private readonly configService: ConfigService
	) {
		this.accessSecret = this.configService.get<string>('ACCESS_SECRET');
		this.refreshSecret = this.configService.get<string>('REFRESH_SECRET');
		this.accessTokenExpiry = this.configService.get<number>('ACCESS_TOKEN_EXPIRY');
		this.refreshTokenExpiry = this.configService.get<number>('REFRESH_TOKEN_EXPIRY');
	}

	getAccessSecret(): string {
		return this.accessSecret;
	}
	getRefreshSecret(): string {
		return this.refreshSecret;
	}

	getAccessTokenExpiry(): number {
		return this.accessTokenExpiry;
	}
	getRefreshTokenExpiry(): number {
		return this.refreshTokenExpiry;
	}
}