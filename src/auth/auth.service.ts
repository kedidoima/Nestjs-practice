import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username : string, password : string): Promise<any>{
        const user = await this.usersService.findOne(username);

        if (user && user.password===password){
            const {password,...rest} = user;
            return rest;
        }
        return null;
    }

    async login(user : any) {
        const payload = { username : user._doc.username, sub : user._doc.id };
        console.log(payload);
    
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
