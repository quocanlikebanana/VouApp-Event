import { Post, Body, Controller } from "@nestjs/common";
import UserEvaluateScoreCommand, { UserEvaluateScoreParam } from "src/commands/game/user-evaluate-score.c";
import UserEvaluateTopCommand, { UserEvaluateTopParam } from "src/commands/game/user-evaluate-top.c";
import UserGiveTurnCommand, { UserGiveTurnParam } from "src/commands/game/user-give-turn.c";
import UserPlayGameCommand, { UserPlayGameParam } from "src/commands/game/user-play-game.c";

@Controller('/game')
export default class GameController {
    constructor(
        private readonly userEveluateScoreCommand: UserEvaluateScoreCommand,
        private readonly userEveluateTopCommand: UserEvaluateTopCommand,
        private readonly userGiveTurnCommand: UserGiveTurnCommand,
        private readonly userPlayGameCommand: UserPlayGameCommand,
    ) { }

    @Post('/evaluate-score')
    userEvaluateScore(@Body() body: UserEvaluateScoreParam) {
        return this.userEveluateScoreCommand.execute(body);
    }

    @Post('/evaluate-top')
    userEvaluateTop(@Body() body: UserEvaluateTopParam) {
        return this.userEveluateTopCommand.execute(body);
    }

    @Post('/give-turn')
    userGiveTurn(@Body() body: UserGiveTurnParam) {
        return this.userGiveTurnCommand.execute(body);
    }

    @Post('/play-game')
    userPlayGame(@Body() body: UserPlayGameParam) {
        return this.userPlayGameCommand.execute(body);
    }
}