import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            clientID: '593674757812-sk84diuececkjh3rpnrgs0vqqaj5vgtp.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/google/redirect',
            scope: ['email', 'profile'],
        })
    }

    async validate (accessToken : string, refreshToken : string, profile: any, done: VerifyCallback) : Promise<any>{
        const {name, emails} = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken
        }
        done(null,user);
    }
}