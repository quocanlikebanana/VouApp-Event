import UserProfilePresenter from "../../user/presenter/user-profile.presenter";
import UserPresenter from "../../user/presenter/user.presenter";

export abstract class IUserReader {
	abstract getUserProfileById(id: string): Promise<UserProfilePresenter | null>;
	abstract getAllUser(): Promise<UserPresenter[]>;
	abstract checkUserExist(id: number): Promise<boolean>;
}