import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/test/all')
  test() {
    return 'Public Content.';
  }
}
