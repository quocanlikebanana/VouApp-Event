import { Post, Body, Controller } from "@nestjs/common";
import UpdateExGameCommand from "src/commands/external-update/update-ex-game.c";
import UpdateExPartnerCommand from "src/commands/external-update/update-ex-partner.c";
import UpdateExPromotionCommand from "src/commands/external-update/update-ex-promotion.c";
import UpdateExPuzzleSetCommand from "src/commands/external-update/update-ex-puzzle-set.c";
import UpdateExUserCommand from "src/commands/external-update/update-ex-user.c";
import { ExternalGame, ExternalPartner, ExternalPromotion, ExternalPuzzleSet, ExternalUser } from "src/domain/common/types/external.type";

// Internal, use gRPC?
@Controller('/ex-update')
export class ExUpdateController {
    constructor(
        private readonly updateExGameCommand: UpdateExGameCommand,
        private readonly updateExPartnerCommand: UpdateExPartnerCommand,
        private readonly updateExPromotionCommand: UpdateExPromotionCommand,
        private readonly updateExPuzzleSetCommand: UpdateExPuzzleSetCommand,
        private readonly updateExUserCommand: UpdateExUserCommand,
    ) { }

    @Post('/game')
    updateExGame(@Body() body: ExternalGame) {
        return this.updateExGameCommand.execute(body);
    }

    @Post('/partner')
    updateExPartner(@Body() body: ExternalPartner) {
        return this.updateExPartnerCommand.execute(body);
    }

    @Post('/promotion')
    updateExPromotion(@Body() body: ExternalPromotion) {
        return this.updateExPromotionCommand.execute(body);
    }

    @Post('/puzzle-set')
    updateExPuzzleSet(@Body() body: ExternalPuzzleSet) {
        return this.updateExPuzzleSetCommand.execute(body);
    }

    @Post('/user')
    updateExUser(@Body() body: ExternalUser) {
        return this.updateExUserCommand.execute(body);
    }
}