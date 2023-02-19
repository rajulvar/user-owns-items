import { IsNotEmpty } from 'class-validator';

export class ItemCreatorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
