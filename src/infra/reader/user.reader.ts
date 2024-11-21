import { IUserReader } from "src/usecases/abstract/reader/user.reader.i";
import { PrismaDatabaseService } from "../common/database/database.service";
import UserProfilePresenter from "src/usecases/user/presenter/user-profile.presenter";
import UserPresenter from "src/usecases/user/presenter/user.presenter";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class UserReader implements IUserReader {
	constructor(private readonly databaseService: PrismaDatabaseService) { }

	async checkUserExist(id: number): Promise<boolean> {
		const user = await this.databaseService.user.findUnique({
			where: {
				id
			}
		});
		if (user == null) {
			return false;
		}
		return true;
	}

	async getUserProfileById(idString: string): Promise<UserProfilePresenter | null> {
		const idNumber = parseInt(idString);
		const user = await this.databaseService.user.findUnique({
			where: {
				id: idNumber
			}
		});
		if (!user) {
			return null;
		}
		return {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			joinedDate: user.createdAt,
		};
	}

	async getAllUser(): Promise<UserPresenter[]> {
		const users = await this.databaseService.user.findMany();
		const mapped = users.map((user) => ({
			id: user.id,
			email: user.email,
			firstName: user.firstName
		}));
		return mapped;
	}
}