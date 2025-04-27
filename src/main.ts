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
                'Đây là một dự án API đơn giản xây dựng bằng NestJS, cung cấp các chức năng quản lý người dùng và thiết bị. Dự án có hệ thống xác thực JWT và phân quyền theo vai trò (RBAC). Các tài khoản đăng nhập bao gồm:\n\n' +
                  '1. **Admin**:\n' +
                  '   - **Email**: admin@example.com\n' +
                  '   - **Mật khẩu**: admin123\n' +
                  '   - **Quyền truy cập**: Admin có quyền truy cập đầy đủ vào tất cả các API, bao gồm việc tạo, sửa, xóa người dùng và thiết bị.\n\n' +
                  '2. **Client**:\n' +
                  '   - **Email**: client@example.com\n' +
                  '   - **Mật khẩu**: client123\n' +
                  '   - **Quyền truy cập**: Client chỉ có quyền xem dữ liệu, bao gồm việc xem thông tin người dùng và thiết bị, nhưng không có quyền sửa đổi hay xóa.\n\n' +
                  'API được bảo vệ bằng xác thực JWT, và Swagger được tích hợp để kiểm tra và khám phá các endpoint.',
              )
              .addBearerAuth()
              .addTag('Devices')
              .addTag('Users')
              .setVersion('1.0')
              .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(8080);
}
bootstrap();
