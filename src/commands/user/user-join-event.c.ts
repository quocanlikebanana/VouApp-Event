import UserEntity from "src/domain/user/user.entity";
import { ICommand } from "../common/abstract/command.handler.i";
import IUserRepository from "src/domain/common/repositories/user.repository.i";

export type UserJoinEventParam = {
    userId: number;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userFacebook: string;
    eventId: number;
    joinDate: Date;
}

export default class UserJoinEventCommand implements ICommand<UserJoinEventParam, void> {
    constructor(
        private readonly userRepository: IUserRepository
    ) { }

    async execute(param: UserJoinEventParam): Promise<void> {
        const entity = new UserEntity({
            ex_user: {
                id: param.userId,
                firstName: param.userFirstName,
                lastName: param.userLastName,
                email: param.userEmail,
                facebook: param.userFacebook
            },
            eventId: param.eventId,
            joinDate: param.joinDate,
            userHasPuzzle: [],
            userExchangePuzzleSet: [],
            userJoinGame: []
        });
        await this.userRepository.create(entity);
    }
}