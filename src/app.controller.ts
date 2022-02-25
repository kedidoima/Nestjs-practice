import { Controller, Get, Post, UseGuards, Request, Response, UseInterceptors, UploadedFile, Body, UploadedFiles, Res, Next} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as multerGoogleStorage from 'multer-google-storage';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from '@google-cloud/storage';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appSrevice: AppService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) :Promise<any> {
    console.log('test');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {
    console.log(req);
  }
  
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  getGoogleLogin(@Request() req){
    return this.appSrevice.googleLogin(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  getLogout(){
    return "test";
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('photo'))
  uploadFile(@UploadedFile() file) {
    return file.path;
  }
  @UseGuards(JwtAuthGuard)
  @Post('uploadToFB')
  @UseInterceptors(FilesInterceptor('file',null,{
    storage : multerGoogleStorage.storageEngine({
      projectId : 'fir-storage-d6b47',
      keyFilename : 'D:/typescript/second-task/src/fir-storage-d6b47-firebase-adminsdk-65gmf-18d645f464.json',
      bucket : 'gs://fir-storage-d6b47.appspot.com',
      filename : (req,file,cb) =>{
        const fileNameSplit = file.originalname.split(".");
        const fileExt = fileNameSplit[fileNameSplit.length - 1];
        cb(null, `${Date.now()}.${fileExt}`);
      }
    })
  }))
  async save(@UploadedFiles() file, @Body() body) : Promise<any>{
    console.log(file);
    return;
  } 

  @Get('/downloadFile/:fileId')
  async getFile(@Request() req ,@Res() res : Response, @Next() next ){
    const body = req.params;
    const storage = new Storage();
    const myBucket = storage.bucket('gs://fir-storage-d6b47.appspot.com');
    const file = myBucket.file(body.fileId);
    await file.download({
      destination : 'D:/typescript/second-task/src/downloads/test.txt'
    }, function(err){
      console.log(err);
    });
    console.log(body.fileId);
    return "downloading....";
  }
}