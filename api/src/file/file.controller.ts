import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Res,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger'
import * as fs from 'fs'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { FileService } from '@/file/file.service'
import { FileMessage } from '@/common/messages'
import { File, FileDocument } from '@/file/schemas/file.schema'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { ListResultDto } from '@/common/dto/list-result.dto'
import { FileDto } from '@/file/dto/file.dto'
import { FileListQueryDto } from '@/file/dto/file-list-query.dto'
import { DefaultException } from '@/common/dto/default-exception.dto'
import { QueryHelper } from '@/common/helpers/query.helper'
import { FolderDto } from '@/file/dto/folder.dto'
import { IEnv } from '@/common/interfaces/env.interface'
import { slugifyTR } from '@/common/utils/slugify-tr.util'
import { UpdateFileDto } from '@/file/dto/update-file.dto'
import { IdParamsDto } from '@/common/dto/params.dto'
import { IFile } from '@/file/interfaces/file.interface'
import { Response } from 'express'
import { join } from 'path'
@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(
    private readonly service: FileService,
    private readonly fileMessage: FileMessage,
    private readonly queryHelper: QueryHelper,
    private configService: ConfigService<IEnv>,
  ) {}

  private uploadFolder = this.configService.get<string>('UPLOAD_FOLDER_PATH')

  @ApiOperation({
    summary: 'Get file items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: ListResultDto<IFile[]>,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Query() query: FileListQueryDto) {
    const q = this.queryHelper.instance(query)
    return this.service.getItems(q, query.folderId)
  }

  @ApiOperation({
    summary: 'Create file items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiCreatedResponse({
    description: 'Created',
    type: [FileDto],
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
        },
        file: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(@UploadedFiles() file: Express.Multer.File[], @Body() body) {
    //Todo: @Body() body'e dto tipi verilecek.
    try {
      let folderId = null
      if (body.path && body.path !== '/') {
        const folder = await this.service.getFolderByPath(body.path)
        folderId = folder._id || null
      }

      let data = new Array<File>()
      data = file.map((f) => {
        return {
          isFolder: false,
          title: f.filename,
          description: '',
          filename: f.filename,
          path: body.path === '/' || !body.path ? null : body.path,
          folderId,
          mimetype: f.mimetype,
          size: f.size,
        }
      })
      return this.service.saveFile(data)
    } catch (err) {
      throw new BadRequestException(`${this.fileMessage.UPLOAD_ERROR}: ${err}`)
    }
  }

  @ApiOperation({
    summary: 'Create folder.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post('/folder')
  async createFolder(@Body() body: FolderDto) {
    // ** When providing the path, there should be no / at the beginning or end.
    const { title, path } = body
    let folderId = null

    if (body.path && body.path !== '/') {
      const folder = await this.service.getFolderByPath(body.path)
      folderId = folder._id || null
    }

    const folderTitle = slugifyTR(title)

    const uploadFolderDir = `${this.uploadFolder}/${
      path === '/' || path === null ? '' : `${path}/`
    }${folderTitle}`

    const newPath = `${
      path === '/' || path === null ? '' : `${path}/`
    }${folderTitle}`

    await fs.promises.mkdir(uploadFolderDir, { recursive: true })
    return this.service.createFolder(title, newPath, folderId)
  }

  @ApiOperation({
    summary: 'Update file item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: FileDto,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() body: UpdateFileDto, @Param() params: IdParamsDto) {
    return this.service.update(body, params.id)
  }

  @ApiOperation({
    summary: 'Delete file item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: IdParamsDto) {
    const item = await this.service.getItemById(params.id)
    if (!item) throw new BadRequestException()

    const exists = await this.service.checkFile(item)
    if (exists)
      throw new BadRequestException(
        item.isFolder
          ? this.fileMessage.EXISTING_FOLDER
          : this.fileMessage.EXISTING_FILE,
      )

    await this.service.delete(params.id)
    if (item.isFolder)
      await fs.promises.rmdir(
        `${this.uploadFolder}${item.path ? `/${item.path}` : ''}`,
      )
    else
      await fs.promises.unlink(
        `${this.uploadFolder}${item.path ? `/${item.path}` : ''}/${
          item.filename
        }`,
      )
  }

  @ApiOperation({
    summary: 'Serve file.',
  })
  @ApiParam({ name: 'filename', type: String })
  @Get('serve/:filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = join(this.uploadFolder, filename)
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath)
      } else {
        res.status(404).json({ message: 'File not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error serving file' })
    }
  }
}
