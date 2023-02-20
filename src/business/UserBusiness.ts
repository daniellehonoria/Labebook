import { UserDatabase } from "../database/UsersDatabase"
import {LoginInput, LoginOutput, SignupInput, SignupOutput } from "../interfaces"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { User } from "../models/UsersModel"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { TokenPayload, USER_ROLES } from "../interfaces"
import {  GetUsersOutput } from "../dtos/UserDTO"
import { HashManager } from "../services/HashManager"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager

    ) {}
     public signup = async (input: SignupInput): Promise<SignupOutput> => {
        const {name, email, password } = input

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)
        const role = USER_ROLES.NORMAL
        const createdAt =  new Date().toISOString()

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            role, // só é possível criar users com contas normais
            createdAt
        )
        //modela os dados do novo usuario a partir de toDBmodel  
        const newUserDB = newUser.toDBModel()

        //cria pessoa no banco de dados a partir da modelação acima
        await this.userDatabase.insertUser(newUserDB)

        const payload:TokenPayload = {
            id:newUser.getId(),
            name: newUser.getName(),
            role:newUser.getRole()
        }
        const token = this.tokenManager.createToken(payload)
        const output: SignupOutput = {
            token: token
        }

        return output
    }

    public login = async (input: LoginInput): Promise<LoginOutput> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new Error("'password' deve ser string")
        }

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado")
        }

        if (password !== userDB.password) {
            throw new BadRequestError("'email' ou 'password' incorretos")
        }

        const output: LoginOutput = {
            token: "token"
        }

        return output
    }
}