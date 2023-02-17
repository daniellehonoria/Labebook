import { Request, Response } from "express"
import {UserBusiness} from "../business/UserBusiness"

export class UsersController{    
    constructor(
        private userBusiness: UserBusiness
    ){}
public getUsers = async(req:Request, res:Response)=>{
    try {

    } catch (error) {
        
    }
}

}