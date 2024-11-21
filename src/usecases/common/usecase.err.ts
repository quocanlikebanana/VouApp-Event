export class UsecaseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UsecaseException';
	}
}