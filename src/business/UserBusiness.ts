import { UserDatabase } from "../database/UsersDatabase";
import { Users } from "../models/Users";
import {IUsersDB} from "../types"

export class UserBusiness{
    public getUsers = async ()=>{
        const usersDatabase = new UserDatabase()
        const usersDB: IUsersDB[] = await usersDatabase.findUsers()

        return usersDB

    }
}