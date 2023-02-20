import { LoginOutput, SignupInput, UserModel, USER_ROLES } from "../interfaces"
import { BadRequestError } from "../Errors/BadRequestError"
import { User } from "../models/UsersModel"

export type GetUsersOutput = UserModel[]

export class UserDTO{

    public createUserDTO(
        id:unknown,
        name: unknown,
        email: unknown,
        password:unknown,
        role:USER_ROLES,
        createdAt:unknown
    ):SignupInput{
        if(id === undefined)throw new BadRequestError("Id é obrigatório")
        if (typeof id !== "string")throw new BadRequestError("'id' deve ser string")
        
        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
        if (typeof createdAt !== "string") {
            throw new BadRequestError("A data de criação deve ser string")
        }


        const dtoUser: UserModel ={
            id,
            name,
            email,
            password,
            role,
            createdAt
        }
        return dtoUser
    }

   public criateUserOutputDTO(user:User):LoginOutput{
        const dto: LoginOutput={
            token:"token"
        }
        return dto
   }
   
}