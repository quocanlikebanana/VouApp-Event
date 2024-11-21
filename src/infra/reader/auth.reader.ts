import IAuthReader from "src/usecases/abstract/reader/auth.reader.i";
import LoginParam from "src/usecases/auth/param/login.param";
import AuthResultPresenter from "src/usecases/auth/presenter/auth-result.presenter";
import { PrismaDatabaseService } from "../common/database/database.service";
import { Injectable } from "@nestjs/common";
import AccountPresenter from "src/usecases/auth/presenter/account.presenter";
import { HashingService } from "../common/helper/hasing.service";

@Injectable()
export default class AuthReader implements IAuthReader {
	constructor(
		private readonly databaseService: PrismaDatabaseService,
		private readonly hashingService: HashingService
	) { }

	async checkUserExists(email: string): Promise<boolean> {
		const user = await this.databaseService.user.findUnique({
			where: {
				email: email
			}
		});
		return user ? true : false;
	}

	async logUserIn(loginParam: LoginParam): Promise<AuthResultPresenter> {
		const user = await this.databaseService.user.findUnique({
			where: {
				email: loginParam.email
			}
		});
		if (!user) {
			return {
				isSucess: false,
				message: "User not found for email: " + loginParam.email
			};
		}
		const isPasswordValid = await this.hashingService.comparePassword(loginParam.password, user.password);
		if (isPasswordValid === false) {
			return {
				isSucess: false,
				message: "Invalid password"
			};
		}
		return {
			isSucess: true,
			message: "User logged in successfully",
			account: {
				userId: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName
			}
		};
	}

	async getAccountById(id: number): Promise<AccountPresenter> {
		const user = await this.databaseService.user.findUnique({
			where: {
				id: id
			}
		});
		return {
			userId: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName
		};
	}

}