# 💬 Real-Time Chat Server Backend

A production-inspired **real-time chat backend** built with **Node.js, Express, PostgreSQL, Socket.IO, JWT Authentication, and Docker**.

This project demonstrates how modern chat applications handle authentication, persistent conversations, real-time messaging, presence tracking, typing indicators, delivery receipts, and read receipts using a clean layered architecture.

---

# 🚀 Features

## Authentication

- User registration
- User login
- JWT access token authentication
- Refresh token rotation
- Secure refresh token storage
- Logout functionality
- Protected REST routes
- Protected Socket.IO connections

---

## Conversations

- Create one-to-one conversations
- Prevent duplicate conversations
- Retrieve user's conversations
- Participant authorization
- Persistent conversation storage

---

## Messaging

- Send messages
- Store messages permanently in PostgreSQL
- Retrieve conversation history
- Sender attribution
- Message timestamps

---

## Real-Time Features (Socket.IO)

- JWT authentication during socket handshake
- Real-time messaging
- Join/leave conversation rooms
- Online/offline presence
- Typing indicators
- Message delivery receipts
- Message read receipts

---

## Security

- Password hashing using bcrypt
- Refresh token hashing
- JWT-based authorization
- Request validation using Zod
- Centralized error handling
- Environment-based configuration

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| PostgreSQL | Persistent database |
| Socket.IO | Real-time communication |
| JWT | Authentication |
| bcrypt | Password hashing |
| Zod | Input validation |
| Docker | Containerization |
| Pino | Logging |

---

# 🏗 Architecture

The project follows a layered backend architecture.

```
Client
  |
  |
Routes
  |
  |
Controllers
  |
  |
Services
  |
  |
Repositories
  |
  |
PostgreSQL
```

Socket.IO follows a similar structure:

```
Socket Connection
        |
        |
Socket Handlers
        |
        |
Services
        |
        |
Repositories
        |
        |
Database
```

---

# 📂 Project Structure

```
Real-Time-Chat-Server-Backend
│
├── database
│   └── schema.sql
│
├── src
│   │
│   ├── config
│   │
│   ├── controllers
│   │
│   ├── errors
│   │
│   ├── middleware
│   │
│   ├── repositories
│   │
│   ├── routes
│   │
│   ├── services
│   │
│   ├── socket
│   │   ├── handlers
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── index.js
│   │   └── onlineUsers.js
│   │
│   ├── utils
│   │
│   ├── validators
│   │
│   ├── app.js
│   └── server.js
│
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── package.json
```

---

# 🗄 Database Design

## Users

Stores registered users.

| Column | Type |
|---|---|
| id | SERIAL |
| email | VARCHAR |
| password_hash | TEXT |
| display_name | VARCHAR |
| created_at | TIMESTAMP |

---

## Conversations

Stores chat conversations.

| Column | Type |
|---|---|
| id | SERIAL |
| created_at | TIMESTAMP |

---

## Conversation Participants

Maps users to conversations.

| Column | Type |
|---|---|
| conversation_id | INT |
| user_id | INT |

---

## Messages

Stores all messages.

| Column | Type |
|---|---|
| id | SERIAL |
| conversation_id | INT |
| sender_id | INT |
| text | TEXT |
| delivered_at | TIMESTAMP |
| seen_at | TIMESTAMP |
| created_at | TIMESTAMP |

---

## Refresh Tokens

Stores refresh tokens securely.

| Column | Type |
|---|---|
| id | SERIAL |
| user_id | INT |
| token_hash | TEXT |
| expires_at | TIMESTAMP |
| revoked_at | TIMESTAMP |

---

# 🔌 REST API

## Authentication

| Method | Endpoint | Description |
|-|-|-|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout user |
| GET | `/auth/me` | Get current user |

---

## Conversations

| Method | Endpoint | Description |
|-|-|-|
| POST | `/conversations` | Create conversation |
| GET | `/conversations` | Get user conversations |
| POST | `/conversations/:id/messages` | Send message |
| GET | `/conversations/:id/messages` | Get messages |

---

# ⚡ Socket.IO Events

## Client → Server

| Event | Purpose |
|-|-|
| `join_conversation` | Join chat room |
| `leave_conversation` | Leave chat room |
| `send_message` | Send message |
| `typing` | Start typing |
| `stop_typing` | Stop typing |
| `message_delivered` | Mark message delivered |
| `message_seen` | Mark message seen |

---

## Server → Client

| Event | Purpose |
|-|-|
| `receive_message` | New message received |
| `user_online` | User connected |
| `user_offline` | User disconnected |
| `typing` | User typing |
| `stop_typing` | User stopped typing |
| `message_delivered` | Delivery update |
| `message_seen` | Read update |

---

# 🔐 Authentication Flow

```
Register
   |
   |
Login
   |
   |
Access Token + Refresh Token
   |
   |
REST API / Socket.IO Handshake
   |
   |
Authenticated User
```

---

# 🐳 Running With Docker

## Clone repository

```bash
git clone <repository-url>
```

Move into project:

```bash
cd Real-Time-Chat-Server-Backend
```

Create environment file:

```bash
cp .env.example .env.docker
```

Start containers:

```bash
docker compose up --build
```

Application runs on:

```
http://localhost:3000
```

---

# 💻 Running Locally

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=chat_db

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Start development server:

```bash
npm run dev
```

---

# 🌎 Environment Variables

| Variable | Description |
|-|-|
| PORT | Server port |
| DB_HOST | Database host |
| DB_PORT | Database port |
| DB_USER | Database username |
| DB_PASSWORD | Database password |
| DB_NAME | Database name |
| JWT_ACCESS_SECRET | Access token secret |
| JWT_REFRESH_SECRET | Refresh token secret |

---

# 📌 Future Improvements

- Group conversations
- File and image sharing
- Message editing
- Message deletion
- Redis Socket.IO adapter
- Horizontal scaling
- Rate limiting
- Push notifications
- End-to-end encryption
- Automated testing

---

# 👩‍💻 Author

**Khushi**

Backend project demonstrating real-time communication, authentication systems, PostgreSQL design, Socket.IO architecture, and Docker-based deployment.