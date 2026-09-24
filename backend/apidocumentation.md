# API Documentation — SiberNote LM

Base URL: `http://localhost:8080`

---

## Response Format

Semua endpoint mengembalikan JSON dengan struktur berikut:

**Success**
```json
{
  "status": "success",
  "message": "string",
  "data": {}
}
```

**Error**
```json
{
  "status": "failed",
  "message": "string"
}
```

---

## Auth

### Register

Membuat akun user baru dan mengembalikan JWT token.

```
POST /user/register
```

**Request Body**

| Field      | Type   | Required | Keterangan            |
|------------|--------|----------|-----------------------|
| `email`    | string | ✅        | Email unik user       |
| `username` | string | ✅        | Username user         |
| `password` | string | ✅        | Password plain-text   |

**Contoh Request**
```json
{
  "email": "raffi@example.com",
  "username": "raffi",
  "password": "rahasia123"
}
```

**Response `201 Created`**
```json
{
  "status": "success",
  "message": "berhasil buat user",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses**

| Status | Kondisi                                    |
|--------|--------------------------------------------|
| `401`  | Salah satu field tidak dikirim             |
| `401`  | Email sudah terdaftar                      |
| `500`  | Kesalahan server                           |

---

### Login

Autentikasi user yang sudah terdaftar dan mengembalikan JWT token.

```
POST /user/login
```

**Request Body**

| Field      | Type   | Required | Keterangan          |
|------------|--------|----------|---------------------|
| `email`    | string | ✅        | Email terdaftar     |
| `password` | string | ✅        | Password plain-text |

**Contoh Request**
```json
{
  "email": "raffi@example.com",
  "password": "rahasia123"
}
```

**Response `200 OK`**
```json
{
  "status": "success",
  "message": "berhasil login",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses**

| Status | Kondisi                              |
|--------|--------------------------------------|
| `401`  | Salah satu field tidak dikirim       |
| `401`  | Email atau password salah            |
| `500`  | Kesalahan server                     |

---

## User

### Get Current User

Mengambil data user yang sedang login berdasarkan JWT token.

```
GET /user/me
```

**Headers**

| Key             | Value                    | Required |
|-----------------|--------------------------|----------|
| `Authorization` | `Bearer <token>`         | ✅        |

**Contoh Request**
```
GET /user/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response `200 OK`**
```json
{
  "status": "success",
  "message": "berhasil get data user",
  "data": {
    "user": {
      "_id": "665f1a2b3c4d5e6f7a8b9c0d",
      "email": "raffi@example.com",
      "username": "raffi",
      "avatarUrl": "",
      "createdAt": "2026-09-24T10:00:00.000Z",
      "updatedAt": "2026-09-24T10:00:00.000Z"
    }
  }
}
```

> Field `password` tidak ikut dikembalikan.

**Error Responses**

| Status | Kondisi                                         |
|--------|-------------------------------------------------|
| `401`  | Token tidak ada, format salah, atau expired     |
| `404`  | User tidak ditemukan di database                |
| `500`  | Kesalahan server                                |

---

## JWT Token

- Token dikembalikan saat register dan login
- Disertakan di setiap request yang butuh autentikasi via header `Authorization: Bearer <token>`
- Payload: `{ userId: string }`
- Expire: **1 jam**
