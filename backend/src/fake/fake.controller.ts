import { Controller, Post } from '@nestjs/common';
import e from 'express';
import { FakeService } from './fake.service';

/**
 * fake controller
 * which contains application logic and passing user input data to service.
 */

@Controller('fake')
export class FakeController {
  constructor(private readonly fakeService: FakeService) {}

  @Post('generate')
  generate() {
    this.fakeService.generate_fake_data();
  }
}
