import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCridentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsNotEmpty({
    message: `Password can't be emplty`,
  })
  @IsString()
  @MinLength(8, {
    message: `Password length should not be less than 8 charachters`,
  })
  @MaxLength(24, {
    message: `Password length should not be more than 24 charachters`,
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Password is weak`,
  })
  password: string;
}
