import { IsUUID } from 'class-validator';

export class GetTaskByIdDto {
  @IsUUID()
  id: string;
}
