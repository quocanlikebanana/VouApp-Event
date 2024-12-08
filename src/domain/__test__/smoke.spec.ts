import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import configuration from "src/config/configuration";

describe('[Unit] Smoke Test', () => {
    let configService: ConfigService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                // Must have ConfigModule and specify the env file in order to use .env.test.local
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env.test.local',
                    load: [configuration]
                }),
            ],
        }).compile();

        configService = moduleRef.get<ConfigService>(ConfigService);
    });

    it('should pass this smoke test', () => {
        expect(true).toBe(true);
    });

    it('should use test env', () => {
        expect(process.env.NODE_ENV).toBe('test');
    });

    it('should use test env', () => {
        const testEnv = process.env.ENV_TEST;
        expect(testEnv).toBe('test');
    });

    it('should use configuration', () => {
        const testEnv = configService.get<string>('useConfig');
        expect(testEnv).toBe(true);
    });
});