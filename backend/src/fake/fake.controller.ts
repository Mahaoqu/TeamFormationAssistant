import { Controller, Post } from '@nestjs/common';
import e from 'express';
import { FakeService } from './fake.service';

@Controller('fake')
export class FakeController {
  constructor(private readonly fakeService: FakeService) {}

  @Post('generate')
  generate() {
    this.fakeService.generate_fake_data();
  }
}
