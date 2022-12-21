import express from "express";
import UseCtrl from "../controllers/useCtrl.js";
import {registerValidation} from "../validation/authValidation.js";
import useCtrl from "../controllers/useCtrl.js";

const router = express.Router()

router.post("/auth/register", UseCtrl.registerUser)
router.post("/auth/login", UseCtrl.loginUser)

router.post("/setAvatar/:id", useCtrl.setAvatar)
router.post("/setAvatar/setImage/:id", useCtrl.setAvatarImageSet)

router.get("/allUsers/:id", useCtrl.getAllUsers)

export default router