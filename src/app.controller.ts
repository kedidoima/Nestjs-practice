import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { AppService } from './app.service';
import { request } from 'http';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appSrevice: AppService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) :Promise<any> {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  getGoogleLogin(@Request() req){
    return this.appSrevice.googleLogin(req);
  }

  @Get('logout')
  getLogout(@Request() req){
    
  }
}
