import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('/ping')
export default class PingController {
    @Get()
    ping() {
        return 'pong';
    }

    @Post()
    echo(@Body() body: any) {
        return body;
    }
}
