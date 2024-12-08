import { Module } from '@nestjs/common';
import ApproveEventCommand from 'src/commands/event/approve-event.c';
import CreateEventCommand from 'src/commands/event/create-event.c';
import DeleteEventCommand from 'src/commands/event/delete-event.c';
import UpdateEventCommand from 'src/commands/event/update-event.c';
import UpdateExGameCommand from 'src/commands/external-update/update-ex-game.c';
import UpdateExPartnerCommand from 'src/commands/external-update/update-ex-partner.c';
import UpdateExPromotionCommand from 'src/commands/external-update/update-ex-promotion.c';
import UpdateExPuzzleSetCommand from 'src/commands/external-update/update-ex-puzzle-set.c';
import UpdateExUserCommand from 'src/commands/external-update/update-ex-user.c';
import UserEvaluateScoreCommand from 'src/commands/game/user-evaluate-score.c';
import UserEvaluateTopCommand from 'src/commands/game/user-evaluate-top.c';
import UserGiveTurnCommand from 'src/commands/game/user-give-turn.c';
import UserPlayGameCommand from 'src/commands/game/user-play-game.c';
import { UserExchangePuzzleSetCommand } from 'src/commands/puzzle/user-exchange-puzzle-set.c';
import { UserGivePuzzleCommand } from 'src/commands/puzzle/user-give-puzzle.c';
import UserJoinEventCommand from 'src/commands/user/user-join-event.c';
import UserJoinGameCommand from 'src/commands/user/user-join-game.c';
import UserLeaveEventCommand from 'src/commands/user/user-leave-event.c';
import { InfraModule } from 'src/infra/infra.module';
import PingController from './routes/ping.controller';
import { EventController } from './routes/event.controller';

@Module({
	imports: [
		InfraModule,
	],
	controllers: [
		PingController,
		EventController,
	],
	providers: [
		// Event
		ApproveEventCommand,
		CreateEventCommand,
		DeleteEventCommand,
		UpdateEventCommand,

		// External
		UpdateExGameCommand,
		UpdateExPartnerCommand,
		UpdateExPromotionCommand,
		UpdateExPuzzleSetCommand,
		UpdateExUserCommand,

		// Game
		UserEvaluateScoreCommand,
		UserEvaluateTopCommand,
		UserGiveTurnCommand,
		UserPlayGameCommand,

		// PuzzleSet
		UserExchangePuzzleSetCommand,
		UserGivePuzzleCommand,

		// User
		UserJoinGameCommand,
		UserJoinEventCommand,
		UserLeaveEventCommand,
	],
})
export class ControllerModule { }
