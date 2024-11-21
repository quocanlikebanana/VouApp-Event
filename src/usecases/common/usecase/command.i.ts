export interface ICommand<TPar, TRes> {
	execute(param: TPar): Promise<TRes>;
}