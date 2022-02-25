import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Test';
  }

  googleLogin(req){
    if (!req.user){
      return 'No user found'
    }
    return req.user.accessToken
    
  }
  
}
