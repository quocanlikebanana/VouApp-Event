import EventRepository from "src/infra/repositories/event.repository";
import { EventAggregate } from "src/domain/event/event.agg";
import { PrismaDatabaseService } from "src/infra/common/database/database.service";
import { Test } from "@nestjs/testing";
import { InfraModule } from "src/infra/infra.module";

describe('EventRepository', () => {
    let eventRepository: EventRepository;
    let prismadb: PrismaDatabaseService;

    let event1: EventAggregate;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [InfraModule],
        }).compile();

        eventRepository = moduleRef.get<EventRepository>(EventRepository);
        prismadb = moduleRef.get<PrismaDatabaseService>(PrismaDatabaseService);

        // Initialize the reusable event variable
        event1 = EventAggregate.create({
            name: 'Event 1',
            description: 'Event 1 description',
            startDate: new Date(Date.now() + 25 * 60 * 60 * 1000), // 25 hours in the future
            endDate: new Date(Date.now() + 49 * 60 * 60 * 1000), // 49 hours in the future
            ex_partner: {
                id: '1',
                name: 'Partner 1',
            },
        });
    });

    it('should create an event', async () => {
        const createdEventId = await eventRepository.createNew(event1);
        expect(createdEventId).not.toBeNull();
        expect(createdEventId).not.toBe('');
        const event_f = await eventRepository.getById(createdEventId);
        expect(event_f).not.toBeNull();
        expect(event_f.props.name).toBe(event1.props.name);
        expect(event_f.props.ex_partner.id).toBe(event1.props.ex_partner.id);
    });

    afterEach(async () => {
        await prismadb.event.deleteMany({});
    });

    afterAll(async () => {
        await prismadb.$disconnect();
    });
});