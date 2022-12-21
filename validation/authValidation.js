import {body} from "express-validator"

export const registerValidation = [
    body("username")
        .trim()
        .not()
        .isEmpty()
        .isLength({min: 3})
        .withMessage("Please Enter Valid username, minimum 4 character long."),
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Please Add Email."),
    body("password")
        .trim()
        .not()
        .isEmpty()
        .isLength({min: 6})
        .withMessage("Please Enter Valid Password, minimum 6 character long."),
]

