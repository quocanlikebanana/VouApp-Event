[Domain Events Design Implementation](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-events-design-implementation#what-is-a-domain-event)

The domain events and their side effects (the actions triggered afterwards that are managed by event handlers) should occur almost immediately, usually in-process, and within the same domain. Thus, domain events could be synchronous or asynchronous.

There are 2 ways (real immediate and deferred) to handle domain events:
1. **Immediate**: The domain event is handled immediately in the same process that raised the event. This is the simplest and most common way to handle domain events. (using static DomainEventDispatcher). But need to be aware of rolling-back when there's error in transaction after event is handled.
   1. https://udidahan.com/2008/08/25/domain-events-take-2/
   2. https://lostechies.com/jimmybogard/2010/04/08/strengthening-your-domain-domain-events/
2. **Deferred**: Add the domain events to a collection and then dispatch those domain events right before or right after committing the transaction (as with SaveChanges in EF).
   1. https://lostechies.com/jimmybogard/2014/05/13/a-better-domain-events-pattern/
