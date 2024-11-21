import LoginParam from "src/usecases/auth/param/login.param";
import AccountPresenter from "src/usecases/auth/presenter/account.presenter";
import AuthResultPresenter from "src/usecases/auth/presenter/auth-result.presenter";

export default abstract class IAuthReader {
	abstract checkUserExists(email: string): Promise<boolean>;
	abstract logUserIn(loginParam: LoginParam): Promise<AuthResultPresenter>;
	abstract getAccountById(id: number): Promise<AccountPresenter>;
}