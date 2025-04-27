import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJs API')
    .setDescription(
      'Simple NestJs API với Swagger, trong project này sẽ có 2 entity: User và Device, ngoài ra còn có Auth cho phép đăng nhập và lấy token để sử dụng các API khác. tài khoản để đăng nhâp mặc đinh là admin, với email và password ở phần ví dụ bên dưới.',
    )
    .addBearerAuth()
    .addTag('Devices')
    .addTag('Users')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
