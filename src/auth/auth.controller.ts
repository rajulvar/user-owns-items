import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCridentialsDto } from './DTO/user-cridentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @Post('/signup')
  singUp(@Body() userCreator: UserCridentialsDto): Promise<User> {
    return this.authServices.createUser(userCreator);
  }

  @Post('/signin')
  signIn(
    @Body() userCridentials: UserCridentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authServices.getUser(userCridentials);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
