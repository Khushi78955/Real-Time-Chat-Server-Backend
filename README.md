# 💬 Real-Time Chat Server Backend

A production-inspired real-time chat backend built with **Node.js, Express, PostgreSQL, Socket.IO, and JWT Authentication**.

This project demonstrates how modern chat applications handle authentication, conversations, messaging, typing indicators, online presence, delivery receipts, and read receipts using a clean layered architecture.

---

## 🚀 Features

### Authentication

- User Registration
- User Login
- JWT Access Tokens
- Refresh Token Rotation
- Logout
- Protected Routes

### Conversations

- Create one-to-one conversations
- Prevent duplicate conversations
- Retrieve all user conversations
- Participant authorization

### Messaging

- Send messages
- Retrieve conversation history
- Store messages in PostgreSQL

### Real-Time Features

- Socket.IO Authentication
- Join/Leave Conversation Rooms
- Real-Time Messaging
- Typing Indicators
- Online / Offline Presence
- Message Delivery Receipts
- Message Read Receipts

### Security

- Password Hashing using bcrypt
- JWT Authentication
- Refresh Token Hashing
- Protected REST APIs
- Protected Socket Connections
- Input Validation with Zod
- Global Error Handling

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | REST API |
| PostgreSQL | Database |
| Socket.IO | Real-time communication |
| JWT | Authentication |
| bcrypt | Password hashing |
| Zod | Validation |
| Docker | Containerization |
| Pino | Logging |

---

# 📂 Project Structure

```text
.
├── database/
│   └── schema.sql
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── errors/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── socket/
│   │   ├── handlers/
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── index.js
│   │   └── onlineUsers.js
│   │
│   ├── utils/
│   ├── validators/
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

# 🗄 Database Schema

## users

| Column | Type |
|---------|------|
| id | SERIAL |
| email | VARCHAR |
| password_hash | TEXT |
| display_name | VARCHAR |
| created_at | TIMESTAMP |

---

## conversations

| Column | Type |
|---------|------|
| id | SERIAL |
| created_at | TIMESTAMP |

---

## conversation_participants

| Column | Type |
|---------|------|
| conversation_id | INT |
| user_id | INT |

---

## messages

| Column | Type |
|---------|------|
| id | SERIAL |
| conversation_id | INT |
| sender_id | INT |
| text | TEXT |
| delivered_at | TIMESTAMP |
| seen_at | TIMESTAMP |
| created_at | TIMESTAMP |

---

## refresh_tokens

| Column | Type |
|---------|------|
| id | SERIAL |
| user_id | INT |
| token_hash | TEXT |
| expires_at | TIMESTAMP |
| revoked_at | TIMESTAMP |

---

# 🔌 REST API

## Authentication

| Method | Endpoint |
|----------|----------------|
| POST | /auth/register |
| POST | /auth/login |
| POST | /auth/refresh |
| POST | /auth/logout |
| GET | /auth/me |

---

## Conversations

| Method | Endpoint |
|----------|---------------------------|
| POST | /conversations |
| GET | /conversations |
| POST | /conversations/:id/messages |
| GET | /conversations/:id/messages |

---

# ⚡ Socket Events

## Client → Server

```text
join_conversation
leave_conversation
send_message
typing
stop_typing
message_delivered
message_seen
```

---

## Server → Client

```text
receive_message
typing
stop_typing
user_online
user_offline
message_delivered
message_seen
```

---

# 🔐 Authentication Flow

```text
Register
      │
      ▼
Login
      │
      ▼
Access Token + Refresh Token
      │
      ├──────────────► REST APIs
      │
      └──────────────► Socket.IO Authentication
```

---

# 🐳 Running with Docker

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project.

```bash
cd Real-Time-Chat-Server-Backend
```

Create a `.env` file using `.env.example`.

Build and start the containers.

```bash
docker compose up --build
```

The API will be available at:

```text
http://localhost:3000
```

---

# 💻 Running Locally

Install dependencies.

```bash
npm install
```

Create a `.env` file using `.env.example`.

Start the development server.

```bash
npm run dev
```

---

# 🌍 Environment Variables

```env
PORT=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
```

---

# 🧠 Architecture

The project follows a layered architecture.

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
PostgreSQL
```

Socket.IO follows a similar structure.

```text
Socket
   │
   ▼
Handlers
   │
   ▼
Services
   │
   ▼
Repositories
```

---

# 📈 Future Improvements

- Group Chats
- Message Editing
- Message Deletion
- File Sharing
- Image Uploads
- Push Notifications
- Redis Adapter
- Horizontal Scaling
- End-to-End Encryption
- Rate Limiting
- Unit & Integration Tests

---

# 👩‍💻 Author

**Khushi**

Built as a backend engineering project to learn authentication, real-time communication, PostgreSQL, Socket.IO, Docker, and clean architecture.
