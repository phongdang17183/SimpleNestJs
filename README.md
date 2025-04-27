# NestJS API cho Quản lý Người dùng & Thiết bị

Một dự án API đơn giản xây dựng bằng **NestJS**, cung cấp chức năng:
- Quản lý **Người dùng** (Users)
- Quản lý **Thiết bị** (Devices)
- **Xác thực** bằng JWT
- **Phân quyền** theo vai trò (RBAC)
- **Swagger** UI để khám phá & kiểm tra API

---

## 📋 Tài khoản mẫu

| Vai trò | Email                | Mật khẩu    | Quyền truy cập                                    |
|---------|----------------------|-------------|---------------------------------------------------|
| **Admin**   | `admin@example.com`  | `admin123`  | Tạo/Sửa/Xóa & xem mọi tài nguyên (Users, Devices) |
| **Client**  | `client@example.com` | `client123` | Chỉ xem (Users, Devices), không có quyền sửa/xóa  |

---

## 🚀 Các endpoint

### Người dùng (Users)
- `POST   /users`         — Tạo mới user  
- `GET    /users`         — Lấy danh sách tất cả users  
- `PUT    /users/{id}`    — Cập nhật thông tin user  
- `DELETE /users/{id}`    — Xóa user  

### Thiết bị (Devices)
- `POST   /devices`       — Tạo mới device  
- `GET    /devices`       — Lấy danh sách tất cả devices  
- `PUT    /devices/{id}`  — Cập nhật thông tin device  
- `DELETE /devices/{id}`  — Xóa device  

---

## 🔐 Xác thực (Authentication)

- Sử dụng **JWT** để bảo vệ các endpoint.  
- Mỗi request cần header:
  \`\`\`http
  Authorization: Bearer <token>
  \`\`\`
- Lấy token bằng cách gọi:
  \`\`\`http
  POST /auth/login
  \`\`\`
  với payload:
  \`\`\`json
  {
    "email": "<your-email>",
    "password": "<your-password>"
  }
  \`\`\`

---

## 📖 Sử dụng Swagger

Dự án tích hợp **Swagger** để khám phá và kiểm tra các endpoint.  
Mở trình duyệt và truy cập:

\`\`\`
http://localhost:3000/api
\`\`\`

- Xem danh sách & mô tả các endpoint  
- Thử nghiệm gửi request & xem response  
- Nhấn **Authorize** để nhập JWT và cấp quyền  

---

## ⚙️ Cài đặt và chạy dự án

### Bước 1: Cài đặt các phụ thuộc

npm install


### Bước 2: Chạy dự án

npm run start
# hoặc để chạy ở chế độ dev

npm run start:dev


> Mặc định server lắng nghe tại \`http://localhost:8080\`

---



## 📄 License

MIT © Your Name
