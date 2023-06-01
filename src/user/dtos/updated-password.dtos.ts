import { IsString } from 'class-validator';

export class UpdatedPasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
