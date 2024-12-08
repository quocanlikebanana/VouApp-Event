import { Body, Controller, Post } from "@nestjs/common";
import { UserExchangePuzzleSetCommand, UserExchangePuzzleSetParam } from "src/commands/puzzle/user-exchange-puzzle-set.c";
import { UserGivePuzzleCommand, UserGivePuzzleParam } from "src/commands/puzzle/user-give-puzzle.c";

@Controller('/puzzle-set')
export default class PuzzleSetController {
    constructor(
        private readonly userExchangePuzzleSetCommand: UserExchangePuzzleSetCommand,
        private readonly userGivePuzzleCommand: UserGivePuzzleCommand,
    ) { }

    @Post('exchange')
    exchangePuzzleSet(@Body() dto: UserExchangePuzzleSetParam) {
        return this.userExchangePuzzleSetCommand.execute(dto);
    }

    @Post('give')
    givePuzzle(@Body() dto: UserGivePuzzleParam) {
        return this.userGivePuzzleCommand.execute(dto);
    }
}