import { Injectable } from "@nestjs/common";
import IQuery from "../../common/usecase/query.i";
import UserPresenter from "../presenter/user.presenter";
import { IUserReader } from "../../abstract/reader/user.reader.i";

@Injectable()
export default class GetAllUsersQuery implements IQuery<null, UserPresenter[]> {
	constructor(private readonly queryService: IUserReader) { }

	async execute(): Promise<UserPresenter[]> {
		const users = await this.queryService.getAllUser();
		return users;
	}
}