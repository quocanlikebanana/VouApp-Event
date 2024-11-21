import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import env from "../../../config/env.const";
import AccountParam from "src/usecases/auth/param/account.param";

class NoAuthGuard extends AuthGuard("local") {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const dummyAccount: AccountParam = {
			userId: 1,
			email: 'dummy@example.com',
			firstName: 'Dummy',
			lastName: 'User',
		}
		context.switchToHttp().getRequest().user = dummyAccount;
		return true;
	}
}

export const ToggleAuthGuard = (name: string) => {
	if (env.DISABLE_AUTH === 'true') {
		console.log('ToggleAuthGuard', env.DISABLE_AUTH);
		return NoAuthGuard;
	}
	return AuthGuard(name);
}