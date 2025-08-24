# Eventify API

A modern, minimal Event Management backend built with Node.js, Express, and MongoDB. Auth uses JWT stored in an HTTP-only cookie. All event routes require authentication and only the creator can update or delete.

## Tech
- Node.js + Express
- MongoDB + Mongoose
- JWT in HTTP-only cookie
- Multer for image uploads
- Helmet, CORS, Morgan
- Input validation with express-validator



Clone and install
```bash
git clone <your-repo-url>.git eventify-api
cd eventify-api
npm i
cp .env.example .env
```


Edit `.env` with your values:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/eventify
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d
COOKIE_SECURE=false
CORS_ORIGIN=http://localhost:5173
```

### 3) Run
```bash
npm run dev
# or
npm start
```
API runs on http://localhost:$PORT (default 5000).

### 4) Smoke tests
Use a client that preserves cookies (Postman, Insomnia) or cURL with a cookie jar.

Register:
```bash
curl -i -c cookies.txt -H "Content-Type: application/json"   -d '{"name":"Rumman","email":"u@example.com","password":"secret12","phoneNumber":"+8801"}'   http://localhost:5000/api/auth/register
```

Login:
```bash
curl -i -c cookies.txt -b cookies.txt -H "Content-Type: application/json"   -d '{"email":"u@example.com","password":"secret12"}'   http://localhost:5000/api/auth/login
```

Create Event (with banner):
```bash
curl -i -c cookies.txt -b cookies.txt   -F title='DevConf' -F description='Annual conf' -F date='2025-09-01' -F time='10:00'   -F location='Dhaka' -F organizerName='Rumman'   -F eventBanner=@/path/to/banner.png   http://localhost:5000/api/events
```

List Events:
```bash
curl -i -b cookies.txt http://localhost:5000/api/events
```

## Endpoints

Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET  `/api/auth/me`

User
- PATCH `/api/users/me`

Events (auth required)
- GET    `/api/events`
- POST   `/api/events`
- GET    `/api/events/:id`
- PATCH  `/api/events/:id`
- DELETE `/api/events/:id`

## Git
```bash
git init
git add .
git commit -m "Initial commit: Eventify API"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Notes
- Cookie is HTTP-only. Set `COOKIE_SECURE=true` when you deploy behind HTTPS and adjust `sameSite` if needed.
- Uploaded banners are served from `/uploads/<filename>`.
