import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import StorageConfig from './storage.config';

@Injectable()
export class StorageService {
    private storage : Storage;
    private bucket : string;

    constructor(){
        this.storage = new Storage({
            projectId : StorageConfig.projectId,
            credentials: {
                client_email : StorageConfig.clientEmail,
                private_key : StorageConfig.privateKey
            },
        });

        this.bucket = StorageConfig.mediaBucket;
    }

    
}
