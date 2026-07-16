// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000", {
//     auth: {
//         token: "PASTE_YOUR_ACCESS_TOKEN_HERE",
//     }
// })

// socket.on("connect", () => {
//     console.log("Connected");
//     socket.emit("join_conversation", 2);
//     setTimeout(() => {
//         socket.emit("send_message", {
//             conversationId: 2,
//             text: "Hello from Socket.IO 🚀",
//         });
//     }, 2000);
// });

// socket.on("receive_message", (message) => {
//     console.log(message);
// });

// socket.on("disconnect", () => {
//     console.log("Disconnected");
// });

// socket.on("connect_error", (err) => {
//     console.log("Connection Error:", err.message);
// });