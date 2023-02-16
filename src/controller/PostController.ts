import { Request, Response } from "express"
import { PostsBusiness } from "../business/PostsBusiness";
import { BaseError } from "../Errors/BaseError";

export class PostController{
    constructor(
        private postsBusiness: PostsBusiness
    ){}
    public getPosts = async(req: Request, res:Response) =>{
        try {
            const output = await this.postsBusiness.getPosts()
            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public createPost = async(req:Request, res:Response) =>{
        try {
            const input ={
                id: req.body.id,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt
            }
            const output = await this.postsBusiness.createPost(input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async(req:Request, res:Response) =>{
        try {
            const input ={
                id: req.body.id,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt
            }
            const output = await this.postsBusiness.editPost(input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public deletePost = async (req: Request, res: Response) => {
        try {

            const input = {
                idToDelete: req.params.id
            }

            const output = await this.postsBusiness.deletePost(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}