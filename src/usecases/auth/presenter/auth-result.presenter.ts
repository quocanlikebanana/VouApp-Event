import AccountPresenter from "./account.presenter";

export default class AuthResultPresenter {
	isSucess: boolean;
	account?: AccountPresenter;
	message?: string;
}
