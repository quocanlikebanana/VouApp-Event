import { EventAggregate } from "src/domain/event/event.agg";

describe('[Domain] >> Event', () => {
    it('should create an event', () => {
        const event = EventAggregate.create({
            name: 'Event 1',
            description: 'Event 1 description',
            startDate: new Date(Date.now() + 25 * 60 * 60 * 1000), // 25 hours in the future
            endDate: new Date(Date.now() + 49 * 60 * 60 * 1000), // 49 hours in the future
            ex_partner: {
                id: '1',
                name: 'Partner 1',
            },
        });
        expect(event).toBeDefined();
    });
});