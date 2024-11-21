import { ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { ToggleAuthGuard } from "./toggle-auth.guard";

export default class LocalGuard extends ToggleAuthGuard('test-sqli-local') {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}
}