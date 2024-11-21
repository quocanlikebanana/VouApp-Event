import { Injectable } from "@nestjs/common";
import IQuery from "src/usecases/common/usecase/query.i";
import { IUserReader } from "src/usecases/abstract/reader/user.reader.i";

@Injectable()
export default class VerifyAccountQuery implements IQuery<number, boolean> {
	constructor(private readonly userReader: IUserReader) { }

	execute(param: number): Promise<boolean> {
		return this.userReader.checkUserExist(param);
	}
}