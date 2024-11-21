import { Entity } from "src/domain/common/entity.a";

export interface UserProps {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export class User extends Entity<UserProps> {
	constructor(props: UserProps) {
		super(props);
	}

	protected validate(props: UserProps): boolean {
		return true;
	}

	update(props: Partial<UserProps>) {
		this.props = { ...this.props, ...props };
	}

	get email(): string {
		return this.props.email;
	}

	get password(): string {
		return this.props.password;
	}

	get firstName(): string {
		return this.props.firstName;
	}

	get lastName(): string {
		return this.props.lastName;
	}
}