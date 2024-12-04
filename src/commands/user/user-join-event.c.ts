import UserAggregate from "src/domain/user/user.agg";
import { ICommand } from "../common/command.handler.i";
import IUnitOfWork from "../common/unit-of-work.i";

export type UserJoinEventParam = {
    userId: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userFacebook: string;
    eventId: string;
    joinDate: Date;
}

export default class UserJoinEventCommand implements ICommand<UserJoinEventParam, void> {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(param: UserJoinEventParam): Promise<void> {
        const entity = UserAggregate.create({
            ex_user: {
                id: param.userId,
                firstName: param.userFirstName,
                lastName: param.userLastName,
                email: param.userEmail,
                facebook: param.userFacebook
            },
            eventId: param.eventId,
            joinDate: param.joinDate,
            userHasPromotion: [],
            userHasPuzzle: [],
            userExchangePuzzleSet: [],
            userJoinGame: []
        });
        await this.unitOfWork.execute(async (uow) => {
            await uow.userRepository.create(entity);
        });
    }
}