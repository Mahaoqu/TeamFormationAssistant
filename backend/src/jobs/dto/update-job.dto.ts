import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    name: any;
    projectId: any;
    phone: any;
    role: any;
    description: any;
    address: any;
}
