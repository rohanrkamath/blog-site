import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as fs from 'fs'
import { join } from 'path'

import { IEnv } from '@/common/interfaces/env.interface'

import { FileController } from '@/file/file.controller'
import { FileService } from '@/file/file.service'
import { TagService } from '@/tag/tag.service'

import { File, FileSchema } from '@/file/schemas/file.schema'

import { ArticleService } from '@/article/article.service'
import { Article, ArticleSchema } from '@/article/schemas/article.schema'
import { Tag, TagSchema } from '@/tag/schemas/tag.schema'

import { PageService } from '@/page/page.service'
import { Page, PageSchema } from '@/page/schemas/page.schema'

import { FileMessage } from '@/common/messages'
import { editFileName } from '@/common/utils/edit-file-name.util'

// Helper function to get the correct upload path
const getUploadPath = (configService: ConfigService<IEnv>) => {
  const uploadPath = configService.get('UPLOAD_FOLDER_PATH')
  
  // Try multiple possible paths for Railway
  const possiblePaths = [
    uploadPath,
    join(process.cwd(), uploadPath),
    '/tmp/uploads',
    '/app/uploads',
    '/data/uploads',
    join(process.cwd(), 'uploads'),
  ]

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
      console.log(`Using upload path for Multer: ${path}`)
      return path
    } catch (error) {
      console.log(`Path ${path} not writable for Multer:`, error.message)
      continue
    }
  }
  
  // Fallback to the original path
  return uploadPath
}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IEnv>) => {
        const uploadPath = getUploadPath(configService)
        
        return {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const { path } = req.body
              let dir = uploadPath
            if (path) dir += `/${path}`
            if (!fs.existsSync(dir)) {
              return fs.mkdir(dir, { recursive: true }, (error) =>
                cb(error, dir),
              )
            }
            return cb(null, dir)
          },
          filename: editFileName,
        }),
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
  providers: [
    FileService,
    ArticleService,
    PageService,
    FileMessage,
    TagService,
  ],
})
export class FileModule {}
