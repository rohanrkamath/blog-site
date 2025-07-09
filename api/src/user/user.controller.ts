import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  Get,
  Patch,
  BadRequestException,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { UserService } from '@/user/user.service'
import { LocalAuthGuard } from '@/common/guards/local-auth.guard'
import { LoginUserDto } from '@/user/dto/login-user.dto'
import { UserDto } from '@/user/dto/user.dto'
import { TokenDto } from '@/user/dto/token.dto'
import { PasswordHelper } from '@/common/helpers/password.helper'
import { UserMessage } from '@/common/messages'
import { DefaultException } from '@/common/dto/default-exception.dto'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { UpdateProfileDto } from '@/user/dto/update-profile.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private passwordHelper: PasswordHelper,
    private readonly userMessage: UserMessage,
  ) {}

  @ApiOperation({
    summary: 'Auth login.',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({
    description: 'Login successful.',
    type: TokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req) {
    return this.service.login(req.user)
  }

  @ApiOperation({
    summary: 'User register',
  })
  @ApiCreatedResponse({ description: 'Register successful.', type: UserDto })
  @ApiBadRequestResponse({
    description:
      'Register error. There is a registered user with the same username or email.',
    type: DefaultException,
  })
  @Post('register')
  async create(@Body() registerUserDto: UserDto) {
    // Optionally, check for existing user here or rely on service
    const exists = await this.service.findUser(registerUserDto.userName, registerUserDto.email)
    if (exists) {
      throw new BadRequestException('There is a registered user with the same username or email.')
    }
    if (registerUserDto.password) {
      registerUserDto.password = await this.passwordHelper.passwordHash(registerUserDto.password)
    }
    return this.service.register(registerUserDto)
  }

  @ApiOperation({
    summary: 'Profile',
  })
  @ApiOkResponse({
    type: UserDto,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.service.findUserById(req.user.userId)
  }

  @ApiOperation({
    summary: 'Profile Update',
  })
  @ApiOkResponse({
    type: UserDto,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() body: UpdateProfileDto) {
    if (body.password && body.password !== '')
      body.password = await this.passwordHelper.passwordHash(body.password)
    return this.service.update(body, req.user.userId)
  }
}
