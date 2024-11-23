import { DomainError } from "../errors/domain.err";

export abstract class Entity<T> {
	private readonly _id?: number;
	private readonly _props: T;

	constructor(props: T, id: number = null) {
		this.validate(props);
		this._id = id;
		this._props = props;
	}

	// Business logic validation: The relations between the properties of the entity not the single properties themselves (format, length, notnull, etc)
	// Is not the same as DTO validation
	// Implement validation rules in the concrete entity class
	protected validate(newProps: T): void {
		throw new DomainError('Entity validation not implemented');
	}

	public equals(entity: Entity<T>): boolean {
		return entity._id === this._id;
	}

	public get id(): number {
		return this._id;
	}

	public get props(): T {
		return this._props;
	}

	public get isNewEntity(): boolean {
		return this._id === null;
	}
}