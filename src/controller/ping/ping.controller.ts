import { Body, Controller, Get, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller('/ping')
export default class PingController {
    constructor(
        private readonly configService: ConfigService
    ) { }

    @Get()
    ping() {
        return 'pong';
    }

    @Get('/env')
    env() {
        return {
            port: this.configService.get<string>('port'),
            test: this.configService.get<string>('ENV_TEST'),
            nodeEnv: process.env.ENV_TEST,
        };
    }

    @Post()
    echo(@Body() body: any) {
        return body;
    }
}
