import {Controller , Get, Post, Body, Res, HttpStatus, Param, Request, UseGuards} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './user.service';
import { User, UserDocument } from './schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
    constructor(private readonly userService : UsersService){

    }
    @ApiOkResponse({type:User})
    @Post('createUser')
    async addUser(@Body() body : CreateUserDto) : Promise<User> {
        return this.userService.insertUser(body);
    }
     
    @ApiCreatedResponse({type:User, isArray : true})
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @ApiCreatedResponse({type:User, isArray : true})
    @Get('search')
    async findOne(@Body() body ): Promise<User> {
        console.log(body);
        return this.userService.findOne(body.username);
    }
    
    @ApiOkResponse({type:User})
    @Get(':id')
    async getUserById(@Param('id') id : string): Promise<User> {
        console.log(id);
        return this.userService.findUserById(Number(id));
    }
}