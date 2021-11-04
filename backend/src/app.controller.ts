import { Controller, Get } from '@nestjs/common';

/**
 * this web application controller
 * which contains application logic and passing user input data to service.
 */

@Controller()
export class AppController {
  @Get('/test/all')
  test() {
    return 'Public Content.';
  }
}
