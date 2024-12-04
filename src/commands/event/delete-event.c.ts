import { ICommand } from "src/commands/common/command.handler.i";
import { DomainError } from "src/domain/common/errors/domain.err";
import IUnitOfWork from "../common/unit-of-work.i";

export type DeleteEventParam = {
    id: string;
}

export default class DeleteEventCommand implements ICommand<DeleteEventParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: DeleteEventParam): Promise<void> {
        await this.unitOfWork.execute(async (uow) => {
            const entity = await uow.eventRepository.getById(param.id);
            if (!entity) {
                throw new DomainError('Event not found');
            }
            entity.checkDeleteable();
            await uow.eventRepository.delete(entity);
        });
    }
}