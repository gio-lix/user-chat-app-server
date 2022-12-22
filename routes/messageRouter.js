import express from "express";
import messagesCtrl from "../controllers/messagesCtrl.js";

const router = express.Router()

router.post("/messages/create", messagesCtrl.addMessage)
router.post("/messages/getall", messagesCtrl.getAllMessage)

export default router
