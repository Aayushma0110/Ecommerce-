import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/Hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/data')
  postData(): string {
    return 'data received';
  }
}
//@PUT()
//@DELETE()
//@PATCH()
