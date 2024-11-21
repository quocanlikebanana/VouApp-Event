import { Injectable } from "@nestjs/common";
import IAuthReader from "../../abstract/reader/auth.reader.i";
import AuthResultPresenter from "src/usecases/auth/presenter/auth-result.presenter";
import LoginParam from "../param/login.param";
import IQuery from "src/usecases/common/usecase/query.i";

@Injectable()
export default class LoginQuery implements IQuery<LoginParam, AuthResultPresenter> {
	constructor(private readonly authReader: IAuthReader) { }

	async execute(param: LoginParam): Promise<AuthResultPresenter> {
		const authResult = await this.authReader.logUserIn(param);
		return authResult;
	}
}