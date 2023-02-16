import { Request, Response } from "express"
import {UserBusiness} from "../business/UserBusiness"

export class UsersController{
public getUsers = async(req:Request, res:Response)=>{
    try {
        const userBusines = new UserBusiness()
    } catch (error) {
        
    }
}

}