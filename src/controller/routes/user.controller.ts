import { Post, Body, Controller } from "@nestjs/common";
import UserJoinEventCommand, { UserJoinEventParam } from "src/commands/user/user-join-event.c";
import UserJoinGameCommand, { UserJoinGameParam } from "src/commands/user/user-join-game.c";
import UserLeaveEventCommand, { UserLeaveEventParam } from "src/commands/user/user-leave-event.c";

@Controller('/user')
export default class UserController {
    constructor(
        private readonly userJoinGameCommand: UserJoinGameCommand,
        private readonly userJoinEventCommand: UserJoinEventCommand,
        private readonly userLeaveEventCommand: UserLeaveEventCommand,
    ) { }

    @Post('/join-game')
    userJoinGame(@Body() body: UserJoinGameParam) {
        return this.userJoinGameCommand.execute(body);
    }

    @Post('/join-event')
    userJoinEvent(@Body() body: UserJoinEventParam) {
        return this.userJoinEventCommand.execute(body);
    }

    @Post('/leave-event')
    userLeaveEvent(@Body() body: UserLeaveEventParam) {
        return this.userLeaveEventCommand.execute(body);
    }
}