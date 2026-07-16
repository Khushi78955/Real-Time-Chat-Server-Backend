// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000", {
//     auth: {
//         token: "PASTE_APPLE_ACCESS_TOKEN_HERE"
//     }
// });

// socket.on("connect", () => {
//     console.log("🍎 Connected:", socket.id);

//     socket.emit("join_conversation", 2);
// });

// socket.on("receive_message", (message) => {
//     console.log("📩 New Message:", message);
// });

// socket.on("typing", (data) => {
//     console.log(`${data.email} is typing...`);
// });

// socket.on("stop_typing", () => {
//     console.log("Typing stopped");
// });

// socket.on("user_online", (user) => {
//     console.log("🟢 Online:", user.email);
// });

// socket.on("user_offline", (user) => {
//     console.log("🔴 Offline:", user.userId);
// });

// socket.on("message_delivered", (message) => {
//     console.log("✅ Delivered:", message.id);
// });

// socket.on("message_seen", (message) => {
//     console.log("👀 Seen:", message.id);
// });

// socket.on("error", (err) => {
//     console.log("❌ Error:", err);
// });

// setTimeout(() => {
//     socket.emit("send_message", {
//         conversationId: 2,
//         text: "Hello Banana 👋"
//     });
// }, 5000);

// setTimeout(() => {
//     socket.emit("typing", {
//         conversationId: 2
//     });
// }, 8000);

// setTimeout(() => {
//     socket.emit("stop_typing", {
//         conversationId: 2
//     });
// }, 11000);