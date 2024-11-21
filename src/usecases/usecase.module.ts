import { Module } from "@nestjs/common";
import { InfraModule } from "src/infra/infra.module";
import GetAllUsersQuery from "./user/uc/getalluser.q";
import GetUserProfileQuery from "./user/uc/getuserprofile.q";
import LoginQuery from "./auth/uc/login.q";
import RegisterCommand from "./auth/uc/register.c";
import CronScanTokenCommand from "./auth/uc/cron-scan-token.c";
import RefreshTokenCommand from "./auth/uc/refresh-token.c";
import SignAccountCommand from "./auth/uc/sign-account.c";
import VerifyAccountQuery from "./auth/uc/verify-account.q";
import TokenService from "./common/services/token.service";
import LogoutCommand from "./auth/uc/logout.c";

@Module({
	imports: [InfraModule],
	providers: [
		// Service
		TokenService,

		// User
		GetAllUsersQuery,
		GetUserProfileQuery,

		// Auth
		LoginQuery,
		RegisterCommand,
		CronScanTokenCommand,
		RefreshTokenCommand,
		SignAccountCommand,
		VerifyAccountQuery,
		LogoutCommand,
	],
	exports: [
		// User
		GetAllUsersQuery,
		GetUserProfileQuery,

		// Auth
		LoginQuery,
		RegisterCommand,
		CronScanTokenCommand,
		RefreshTokenCommand,
		SignAccountCommand,
		VerifyAccountQuery,
		LogoutCommand,
	]
})
export class UsecaseModule { }