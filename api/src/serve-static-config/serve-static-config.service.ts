import { Injectable } from '@nestjs/common'
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static'
import { ConfigService } from '@nestjs/config'
import { IEnv } from '@/common/interfaces/env.interface'
import { join } from 'path'
import * as fs from 'fs'

@Injectable()
export class ServeStaticConfigurationService
  implements ServeStaticModuleOptionsFactory
{
  constructor(private configService: ConfigService<IEnv>) {}

  createLoggerOptions():
    | ServeStaticModuleOptions[]
    | Promise<ServeStaticModuleOptions[]> {
    const uploadPath = this.configService.get('UPLOAD_FOLDER_PATH')
    
    // Try multiple possible paths for Railway
    const possiblePaths = [
      uploadPath,
      join(process.cwd(), uploadPath),
      '/tmp/uploads',
      '/app/uploads',
      '/data/uploads',
      join(process.cwd(), 'uploads'),
    ]

    let absolutePath = uploadPath
    for (const path of possiblePaths) {
      try {
        // Create directory if it doesn't exist
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, { recursive: true })
        }
        // Test if we can write to this directory
        const testFile = join(path, '.test')
        fs.writeFileSync(testFile, 'test')
        fs.unlinkSync(testFile)
        absolutePath = path
        console.log(`Using upload path: ${absolutePath}`)
        break
      } catch (error) {
        console.log(`Path ${path} not writable:`, error.message)
        continue
      }
    }

    return [
      {
        rootPath: absolutePath,
        serveRoot: '/uploads',
        exclude: ['/api*'],
      },
    ]
  }
}
