import bcrypt from "bcrypt"

import UserModal from "../modal/userModal.js";
import {body, validationResult} from "express-validator"
import ProjectError from "../helper/error.js";

class UseCtrl {
    async registerUser(req, res) {

        try {
            const {username, email, password} = req.body
            // const validationError = validationResult(req)
            // if (!validationError.isEmpty()) {
            //     const err = new ProjectError("validation failed")
            //     err.statusCode = 422
            //     err.data = validationError.array()
            //     throw err
            // }


            const checkUser = await UserModal.findOne({email})
            if (checkUser) {
                return res.json({msg: "Username already used", status: false})
            }

            const hashPassword = await bcrypt.hash(password, 12)

            const user = new UserModal({
                username,
                email,
                password: hashPassword
            })
            await user.save()
            return res.json({status: true, user})
        } catch (err) {
            return res.status(500).json({err})
        }
    }

    async loginUser(req, res) {
        const {email, password} = req.body
        try {
            const checkUser = await UserModal.findOne({email})
            if (!checkUser) {
                return res.json({msg: "User in this email does not exist.", status: false})
            }
            const isPasswordValid = await bcrypt.compare(password, checkUser.password)
            if (!isPasswordValid) {
                return res.json({msg: "Password Incorrect.", status: false})
            }
            res.json({user:checkUser, status: true})
        } catch (err) {
            return res.status(500).json({err})
        }
    }
    async setAvatar(req, res) {
        const {authId,image} = req.body
        try {
            const userData = await UserModal.findByIdAndUpdate(authId, {
                // isAvatarImageSet: true,
                avatarImage: image
            }, {new: true})
            res.json({
                // isSet: userData.isAvatarImageSet,
                image: userData.avatarImage,
            })
        } catch (err) {
            return res.status(500).json({err})
        }
    }
    async setAvatarImageSet(req, res) {
        const {authId} = req.body
        try {
            const userData = await UserModal.findByIdAndUpdate(authId, {
                isAvatarImageSet: true,
            }, {new: true})
            res.json({
                user: userData
            })
        } catch (err) {
            return res.status(500).json({err})
        }
    }
    async getAllUsers(req, res){
        try {
            const users = await UserModal
                .find({_id: {$ne: req.params.id} })
                .select(["email", "username", "avatarImage", "_id"])

            return res.json(users)
        } catch (err) {
            return res.status(500).json({err})
        }
    }
}

export default new UseCtrl()