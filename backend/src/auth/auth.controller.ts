import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UsersService,
        private readonly authServuce: AuthService) { }

    @Post('signin')
    async login(@Body() loginUserDto: LoginDto) {
        const _user = await this.userService.login(loginUserDto.username, loginUserDto.password);
        const token = await this.authServuce.login(_user.id);
        return {
            id: _user.id,
            username: _user.name,
            email: _user.email,
            roles: [_user.role],
            accessToken: token.access_token
        }
    }

    @Post('signup')
    async signUp(@Body() loginUserDto: SignUpDto) {
        this.userService.createWithUniqueNameEmail(loginUserDto);
        return { message: "User registered successfully!" }
    }
}
