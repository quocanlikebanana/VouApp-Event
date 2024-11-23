export default interface IQuery<TPar, TPre> {
	execute(param: TPar): Promise<TPre>;
}