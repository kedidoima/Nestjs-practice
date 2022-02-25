import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/createUser.dto";
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService{
    constructor (@InjectModel(User.name) private userModel : Model<UserDocument>){}
    async insertUser(createUserDto : CreateUserDto) : Promise<User> {
        const newUser = {id:Date.now(), ...createUserDto};
        const createUser = new this.userModel(newUser);
        return createUser.save();
    }

    async findAll(): Promise<User[]>{
        const res = await this.userModel.find().exec();
        return res;
    }

    async findUserById(id:number) : Promise<User> {

        return await this.userModel.findOne({id : id});
    }

    async findOne(username : string) :  Promise<User> {
        console.log(username);
        return await this.userModel.findOne({username : username});
    }
}