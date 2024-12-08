import { EventAggregate } from "src/domain/event/event.agg";
import { Test } from "@nestjs/testing";
import { InfraModule } from "src/infra/infra.module";
import { PrismaDatabaseService } from "src/infra/common/database/prismadb.service";
import { DomainError } from "src/domain/common/errors/domain.err";
import IEventRepository from "src/domain/common/repositories/event.repository.i";

describe('IEventRepository', () => {
    let eventRepository: IEventRepository;
    let prismadb: PrismaDatabaseService;

    let event1: EventAggregate;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [InfraModule],
        }).compile();

        eventRepository = moduleRef.get<IEventRepository>(IEventRepository);
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

    it('should be able to create and delete an event [getById] [createNew] [delete]', async () => {
        const createdEventId = await eventRepository.createNew(event1);
        expect(createdEventId).not.toBeNull();
        expect(createdEventId).not.toBe('');
        const event_f = await eventRepository.getById(createdEventId);
        expect(event_f).not.toBeNull();
        expect(event_f.props.name).toBe(event1.props.name);
        expect(event_f.props.ex_partner.id).toBe(event1.props.ex_partner.id);
        await eventRepository.delete(event_f);
        await expect(eventRepository.getById(createdEventId)).rejects.toThrow(DomainError);
    });



    afterEach(async () => {
        await prismadb.event.deleteMany({});
    });

    afterAll(async () => {
        await prismadb.$disconnect();
    });
});