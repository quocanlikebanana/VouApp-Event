import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class LoginParam {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}