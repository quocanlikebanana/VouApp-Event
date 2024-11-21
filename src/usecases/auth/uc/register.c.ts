import { Injectable } from "@nestjs/common";
import IAuthReader from "../../abstract/reader/auth.reader.i";
import AuthResultPresenter from "src/usecases/auth/presenter/auth-result.presenter";
import RegisterParam from "../param/register.param";
import { ICommand } from "src/usecases/common/usecase/command.i";
import IUserRepository from "src/domain/abstract/repositories/user.repository.i";
import { User } from "src/domain/entities/user/user.entity";

@Injectable()
export default class RegisterCommand implements ICommand<RegisterParam, AuthResultPresenter> {
	constructor(
		private readonly authReader: IAuthReader,
		private readonly userRepository: IUserRepository,
	) { }

	async execute(param: RegisterParam): Promise<AuthResultPresenter> {
		const isUserExists = await this.authReader.checkUserExists(param.email);
		if (isUserExists) {
			return {
				isSucess: false,
				message: "User already exists with email: " + param.email
			};
		}
		const user = new User({
			email: param.email,
			password: param.password,
			firstName: param.firstName,
			lastName: param.lastName
		});
		const id = await this.userRepository.create(user);
		return {
			isSucess: true,
			message: "User registered successfully",
			account: {
				userId: id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			}
		};
	}
}