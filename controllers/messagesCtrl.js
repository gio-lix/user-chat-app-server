import MessageModal from "../modal/messageModal.js";

class MessagesCtrl {
    async addMessage(req, res) {
        try {
            const {from , to , message} = req.body
            const data = new MessageModal({
                message: {text: message},
                users: [from, to],
                sender: from
            })


            await data.save()
            return res.json({msg: "Message added successfully."})
        } catch (err) {
            return res.status(500).json({err})
        }
    }
    async getAllMessage(req, res) {
        try {
            const {from, to} = req.body

            const messages = await MessageModal.find({
                users: {$all: [from, to]}
            }).sort({updatedAt: 1})


            const projectMessages = messages.map((msg) => {
                return {
                    from: msg.sender.toString() === from && msg.sender,
                    message: msg.message.text
                }
            })

            res.json(projectMessages)
        } catch (err) {
            return res.status(500).json({err})
        }
    }
}

export default new MessagesCtrl()