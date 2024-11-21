import { User } from "src/domain/entities/user/user.entity";

export default abstract class IUserRepository {
	abstract create(user: User): Promise<number>;
	abstract update(user: User): Promise<void>;
	abstract delete(id: number): Promise<void>;
}