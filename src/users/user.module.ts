import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./user.controlller";
import { UsersService } from "./user.service";


@Module({
    imports : [MongooseModule.forFeature([{name : User.name, schema : UserSchema}])],
    controllers : [UsersController],
    providers : [UsersService],
    exports : [UsersService]
})

export class UserModule{}