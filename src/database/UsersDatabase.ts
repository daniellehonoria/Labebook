import { IUsersDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public async findUsers(){
        const usersDB: IUsersDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        return usersDB
    }

}