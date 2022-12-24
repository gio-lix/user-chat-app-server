const globalObject = new Map()

const SocketServer = (socket) => {
    socket.on("joinUser", (userId) => {
        globalObject.set(userId, socket.id)

    })

    socket.on("sendMsg", (data) => {
        const sendUserSocket = globalObject.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msgReceive", data.message)
        }
    })
}
export default SocketServer

