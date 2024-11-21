export default abstract class IRefreshTokenRepository {
	abstract createNew(refreshToken: string, userId: number): Promise<void>;
	abstract clearAllForUser(userId: number): Promise<void>;
	abstract clearExpired(): Promise<void>;
}