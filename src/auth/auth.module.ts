import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.startegy';
import { jwtConstants } from './constants';

@Module({
    imports : [
        UserModule,
        PassportModule, 
        JwtModule.register({
            secret : jwtConstants.secret,
            signOptions : {expiresIn : '600s'}
        })
    ],
    providers : [AuthService,LocalStrategy,JwtStrategy],
    exports : [AuthService]
})
export class AuthModule {}
