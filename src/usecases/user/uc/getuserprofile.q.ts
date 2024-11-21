import { Injectable } from "@nestjs/common";
import IQuery from "../../common/usecase/query.i";
import UserProfilePresenter from "../presenter/user-profile.presenter";
import { IUserReader } from "../../abstract/reader/user.reader.i";
import { UsecaseError } from "src/usecases/common/usecase.err";

@Injectable()
export default class GetUserProfileQuery implements IQuery<string, UserProfilePresenter> {
	constructor(private readonly queryService: IUserReader) { }

	async execute(id: string): Promise<UserProfilePresenter> {
		const user = await this.queryService.getUserProfileById(id);
		if (!user) {
			throw new UsecaseError('User not found');
		}
		return user;
	}
}