# Eventify API

A simple Event Management System backend built with Node.js, Express, and MongoDB.  
Users can register, log in, and manage events. Only authenticated users can create, update, or delete their events.

---

## Features
- User Registration & Login (JWT + HTTP-only cookie)
- View & Update User Profile
- Create, Read, Update, Delete Events
- Authentication & Authorization for event routes
- File upload for event banners (Multer)

---

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/eventify-api.git
   cd eventify-api
   
Install dependencies--

bash``
npm install

Setup environment variables``
.env.example to .env and update values:

bash``
cp .env.example .env

Run the server
bash``
npm run dev
