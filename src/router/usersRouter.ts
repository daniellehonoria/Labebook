import express  from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../database/UsersDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()


const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)