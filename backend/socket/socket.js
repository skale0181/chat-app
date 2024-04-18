import { Server } from "socket.io";
import http from "http";
import express from "express";

let app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

//export function for return receiver socketId to emit for specific client 
export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id; //stored the online user id to the object

  //io.emit() is used to send events to all the connected client;
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); //send all user id in array format

  //socket.on is used to listen to the events. can be used both on client and server side
  socket.on("disconnected", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];//remove offline userId from object 
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //send all user id in array format
  });
});

export { app, io, server };
