import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from '@/app.module'
import { IEnv } from '@/common/interfaces/env.interface'
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor'
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { setupSwagger } from '@/setupSwagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    //logger: console,
    bufferLogs: true,
  })

  const configService = app.get<ConfigService<IEnv>>(ConfigService)
  const apiPrefix = configService.get<string>('API_PREFIX')
  const apiPort = configService.get<string>('API_PORT')
  const swaggerUrl = configService.get<string>('SWAGGER_URL')

  setupSwagger(app)

  app.useGlobalFilters(new HttpExceptionFilter())

  app.setGlobalPrefix(apiPrefix)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
  
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(apiPort)
  const appUrl = await app.getUrl()
  console.log(`Application is running on: ${appUrl}`)
  console.log(`Swagger: ${appUrl}/${swaggerUrl}`)
}
bootstrap()
