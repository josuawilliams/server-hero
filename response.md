# Hacktiv Legend API Documentation

## Models

### User

```md
- email : string, required, unique
- password : string, required
```

### Hero (akan menjadi `Heros` dari sequelizenya)

```md
- name : string, required
- type : string, required
- imageUrl : string, required
```

### Favourite

```md
- heroId : integer, required
- userId : integer, required
- role : string, (default: "-")
- power : integer, (default: 0)
```

## Relationship

### Many-to-Many

Perhatikan relasi antara `User`, `Favourite`, dan `Hero` gunakan definisi relasi yang sesuai pada sequelize relation [doc](https://sequelize.org/master/manual/advanced-many-to-many.html).

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /heroes`
- `GET /favourites`
- `POST /favourites/:heroId`

Routes below need authentication & authorization:

- `PUT /favourites/:id`

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. GET /heroes

Fetch all heroes from database

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
  {
    "id": 1,
    "name": "Paquito",
    "type": "Fighter",
    "imageUrl": "https://img.mobilelegends.com/group1/M00/00/B2/Cq2IxmAKtDOAe9QQAAIoQFvuZwA933.jpg"
  },
  {
    "id": 2,
    "name": "Barats",
    "type": "Tank",
    "imageUrl": "https://img.mobilelegends.com/group1/M00/00/AB/Cq2Ixl-_iUCAQOs3AALNya38dwM674.jpg"
  },
  {
    "id": 3,
    "name": "Yu Zhong",
    "type": "Fighter",
    "imageUrl": "https://img.mobilelegends.com/group1/M00/00/A8/Cq2Ixl8MDzOAYTdJAAGJKaZhxlA426.jpg"
  },
  ...,
]
```

## 4. POST /favourites/:heroId

Add new favourite hero

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "heroId": "integer"
}
```

Response (201 - Created)

```json
{
  "id": 1,
  "userId": 1,
  "heroId": 1,
  "role": "-",
  "power": 0
}
```

Response (404 - Not Found)

```json
{
  "message": "Hero not found"
}
```

## 5. GET /favourites

Get current user favourites

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
  {
    "id": 1,
    "userId": 1,
    "heroId": 1,
    "role": "",
    "power": 0,
    "Hero": {
      "id": 1,
      "name": "Paquito",
      "type": "Fighter",
      "imageUrl": "https://img.mobilelegends.com/group1/M00/00/B2/Cq2IxmAKtDOAe9QQAAIoQFvuZwA933.jpg"
    }
  },
  ...,
]
```

## 6. PUT /favourites/:id

- Update favourite hero

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "role": "string",
  "power": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "Hero has been updated"
}
```

Response (404 - Not Found)

```json
{
  "message": "Hero not found"
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
