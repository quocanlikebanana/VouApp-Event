import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { DomainError as DomainError } from "../domain/common/errors/domain.err";

// Define the error response format
type MyError = {
	statusCode: number;
	timeStamp: string;
	path: string;
	response: string | object;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const responseError: MyError = {
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			timeStamp: new Date().toISOString(),
			path: request.url,
			response: '',
		}

		if (exception instanceof DomainError) {
			responseError.statusCode = HttpStatus.BAD_REQUEST;
			responseError.response = `Domain: ${exception.message}`;
		}

		// Http errors
		else if (exception instanceof HttpException) {
			responseError.statusCode = exception.getStatus();
			responseError.response = exception.message;
		}

		// Other errors
		else {
			responseError.response = 'Internal Server Error';
		}

		response
			.status(responseError.statusCode)
			.json(responseError);
		super.catch(exception, host);
	}
}
