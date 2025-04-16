import { Injectable } from '@nestjs/common'
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static'
import { ConfigService } from '@nestjs/config'
import { IEnv } from '@/common/interfaces/env.interface'
import { join } from 'path'

@Injectable()
export class ServeStaticConfigurationService
  implements ServeStaticModuleOptionsFactory
{
  constructor(private configService: ConfigService<IEnv>) {}

  createLoggerOptions():
    | ServeStaticModuleOptions[]
    | Promise<ServeStaticModuleOptions[]> {
    const uploadPath = this.configService.get('UPLOAD_FOLDER_PATH')
    const absolutePath = uploadPath.startsWith('.') 
      ? join(process.cwd(), uploadPath)
      : uploadPath

    return [
      {
        rootPath: absolutePath,
        serveRoot: '/uploads',
        exclude: ['/api*'],
      },
    ]
  }
}
