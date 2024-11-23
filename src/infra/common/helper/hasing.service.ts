import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
	private readonly saltRounds: number = 10;

	async hash(str: string): Promise<string> {
		const salt = await bcrypt.genSalt(this.saltRounds);
		return bcrypt.hash(str, salt);
	}

	async compare(str: string, hashedStr: string): Promise<boolean> {
		return bcrypt.compare(str, hashedStr);
	}
}
