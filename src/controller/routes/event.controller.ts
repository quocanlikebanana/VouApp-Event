import { Body, Controller, Post } from '@nestjs/common';
import ApproveEventCommand, { ApproveEventParam } from 'src/commands/event/approve-event.c';
import CreateEventCommand, { CreateEventParam } from 'src/commands/event/create-event.c';
import DeleteEventCommand, { DeleteEventParam } from 'src/commands/event/delete-event.c';
import UpdateEventCommand, { UpdateEventParam } from 'src/commands/event/update-event.c';

@Controller('/event')
export class EventController {
    constructor(
        private readonly approveEventCommand: ApproveEventCommand,
        private readonly createEventCommand: CreateEventCommand,
        private readonly deleteEventCommand: DeleteEventCommand,
        private readonly updateEventCommand: UpdateEventCommand,
    ) { }

    @Post('/approve')
    approveEvent(@Body() body: ApproveEventParam) {
        return this.approveEventCommand.execute(body);
    }

    @Post('/create')
    createEvent(@Body() body: CreateEventParam) {
        return this.createEventCommand.execute(body);
    }

    @Post('/update')
    updateEvent(@Body() body: UpdateEventParam) {
        return this.updateEventCommand.execute(body);
    }

    @Post('/delete')
    deleteEvent(@Body() body: DeleteEventParam) {
        return this.deleteEventCommand.execute(body);
    }
}
