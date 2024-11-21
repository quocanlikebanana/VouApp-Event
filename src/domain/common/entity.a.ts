export abstract class Entity<T> {
	private id?: string;
	protected readonly createdAt: Date;
	protected props: T;

	constructor(props: T) {
		this.id = null;
		this.validate(props);
		this.props = props;
		this.createdAt = new Date();
	}

	// Assign an id to the entity (used by the repository / readers when retrive data from the database)
	static assignId<T>(id: string, entity: Entity<T>) {
		entity.id = id;
	}

	// Business logic validation: The relations between the properties of the entity not the single properties themselves (format, length, notnull, etc)
	// Is not the same as DTO validation
	protected abstract validate(props: T): boolean;

	public equals(entity: Entity<T>): boolean {
		return entity.id === this.id;
	}

	public get Id(): string {
		return this.id;
	}
}