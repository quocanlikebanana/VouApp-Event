import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import UserProfilePresenter from 'src/usecases/user/presenter/user-profile.presenter';
import UserPresenter from 'src/usecases/user/presenter/user.presenter';
import GetAllUsersQuery from 'src/usecases/user/uc/getalluser.q';
import GetUserProfileQuery from 'src/usecases/user/uc/getuserprofile.q';
import JwtGuard from '../common/guards/jwt.guard';
import { User } from '../common/decorator/user.decorator';
import AccountParam from 'src/usecases/auth/param/account.param';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
	constructor(
		private readonly getAllUsersQUC: GetAllUsersQuery,
		private readonly getUserProfileQUC: GetUserProfileQuery,
	) { }

	@Get()
	async getUserProfileByIdQuery(@Query('userId') id: number): Promise<UserProfilePresenter> {
		const user = await this.getUserProfileQUC.execute(id.toString());
		return user;
	}

	@Get('/all')
	async getAllUser(): Promise<UserPresenter[]> {
		const users = await this.getAllUsersQUC.execute();
		return users;
	}

	@Get('/profile')
	async getUserProfile(@User() user: AccountParam): Promise<UserProfilePresenter> {
		const id = user.userId.toString()
		const userProfile = await this.getUserProfileQUC.execute(id);
		return userProfile;
	}

	// Remove the order, param routes go last
	@Get('/:id')
	async getUserProfileById(@Param('id') id: string): Promise<UserProfilePresenter> {
		const user = await this.getUserProfileQUC.execute(id);
		return user;
	}


}
