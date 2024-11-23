import { DomainError } from "../errors/domain.err";

export abstract class Entity<T> {
	private readonly id: number;
	protected readonly createdAt: Date;
	protected readonly props: T;

	constructor(id: number, props: T) {
		this.validate(props);
		this.id = id;
		this.props = props;
		this.createdAt = new Date();
	}

	// Business logic validation: The relations between the properties of the entity not the single properties themselves (format, length, notnull, etc)
	// Is not the same as DTO validation
	// Implement validation rules in the concrete entity class
	protected validate(newProps: T): void {
		throw new DomainError('Entity validation not implemented');
	}

	public equals(entity: Entity<T>): boolean {
		return entity.id === this.id;
	}
}