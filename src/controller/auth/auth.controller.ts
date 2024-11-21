import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import LocalGuard from '../common/guards/local.guard';
import RegisterParam from 'src/usecases/auth/param/register.param';
import SignAccountCommand from 'src/usecases/auth/uc/sign-account.c';
import { User } from '../common/decorator/user.decorator';
import AccountParam from 'src/usecases/auth/param/account.param';
import RegisterCommand from 'src/usecases/auth/uc/register.c';
import TokenPairPresenter from 'src/usecases/auth/presenter/tokenpair.presenter';
import RefreshTokenCommand from 'src/usecases/auth/uc/refresh-token.c';
import LogoutCommand from 'src/usecases/auth/uc/logout.c';
import AuthResponsePresenter from './auth.response';
import JwtGuard from '../common/guards/jwt.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly registerCommand: RegisterCommand,
		private readonly signAccountCommand: SignAccountCommand,
		private readonly refreshTokenCommand: RefreshTokenCommand,
		private readonly logoutCommand: LogoutCommand,
	) { }

	@Post('/login')
	@SkipThrottle()
	@UseGuards(LocalGuard)
	async login(@User() user: AccountParam): Promise<AuthResponsePresenter> {
		const tokenPair = await this.signAccountCommand.execute({
			userId: user.userId,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		});
		return {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			accessToken: tokenPair.accessToken,
			refreshToken: tokenPair.refreshToken,
		};
	}

	@Post('/register')
	async register(@Body() registerData: RegisterParam): Promise<AuthResponsePresenter> {
		const authResult = await this.registerCommand.execute(registerData);
		if (authResult.isSucess === false || authResult.account == null) {
			throw new UnauthorizedException(authResult.message);
		}
		const tokenPair = await this.signAccountCommand.execute(authResult.account);
		return {
			email: authResult.account.email,
			firstName: authResult.account.firstName,
			lastName: authResult.account.lastName,
			accessToken: tokenPair.accessToken,
			refreshToken: tokenPair.refreshToken,
		};
	}

	@Post('/refresh')
	async refresh(@Body('refreshToken') refreshToken: string): Promise<TokenPairPresenter> {
		const tokenPair = await this.refreshTokenCommand.execute(refreshToken);
		if (tokenPair == null) {
			throw new UnauthorizedException('Invalid refresh token');
		}
		return tokenPair;
	}

	@Get('/logout')
	@UseGuards(JwtGuard)
	async logout(@User() user: AccountParam): Promise<void> {
		await this.logoutCommand.execute(user);
	}
}
