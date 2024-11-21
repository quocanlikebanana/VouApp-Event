import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Extension for the param decorators (similar to @Body, @Query, @Param, etc.)
// This decorator is used to get the user object from the request object
// You can add Pipes to validate the user object
export const User = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const user = request.user;
		return data ? user?.[data] : user;
	},
);