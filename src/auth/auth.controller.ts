import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    description: 'User registration data',
    examples: {
      example: { value: { username: 'newuser', password: 'password123' } },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async register(@Body() body) {
    console.log('bdy', body);
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({
    description: 'User login data',
    examples: {
      example: { value: { username: 'existinguser', password: 'password123' } },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() body) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return { message: 'Geçersiz kullanıcı adı veya şifre' };
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Get the current user profile' })
  @ApiResponse({ status: 200, description: 'Return the current user profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getProfile(@Request() req) {
    return req.user;
  }
}
