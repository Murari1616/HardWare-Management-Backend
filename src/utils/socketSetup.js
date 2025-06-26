// socket.js (CommonJS)
const { Server } = require("socket.io");

let io;
const userSocketMap = new Map();

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('✅ User connected:', socket.id);

        socket.on('register', (userId) => {
            userSocketMap.set(userId, socket.id);
            socket.join(userId);
            console.log(`📌 User ${userId} registered with socket ${socket.id}`);
        });

        socket.on('disconnect', () => {
            for (let [userId, sockId] of userSocketMap.entries()) {
                if (sockId === socket.id) {
                    userSocketMap.delete(userId);
                    console.log(`❌ User ${userId} disconnected`);
                }
            }
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};

const getUserSocketId = (userId) => userSocketMap.get(userId);

module.exports = {
    initSocket,
    getIO,
    getUserSocketId
};
