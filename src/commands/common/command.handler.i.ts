export interface ICommandHandler<TPar, TRes> {
	execute(param: TPar): Promise<TRes>;
}