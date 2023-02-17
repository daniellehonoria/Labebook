import { BadRequestError } from "../Errors/BadRequestError"
import {  CreatePostInputDTO, CreatePostOutputDTO } from "../interfaces"
import { Posts } from "../models/PostsModel"

export class PostDTO{
    public createPostInput(
        id:unknown,
        content: unknown,
        likes: unknown,
        dislikes:unknown,
        createdAt:unknown,
        updatedAt:unknown,
        creatorId:unknown,
        creatorName:unknown
    ): CreatePostInputDTO{
        if(id === undefined)throw new BadRequestError("Id é obrigatório")
        if (typeof id !== "string")throw new BadRequestError("'id' deve ser string")
        
        if(content === undefined)throw new BadRequestError("Content é obrigatório")
        if(typeof content !== "string")throw new BadRequestError("content deve ser string")
        
        if (typeof likes !== "number")throw new BadRequestError("'likes' deve ser number")
        if (typeof dislikes !== "number")throw new BadRequestError("'dislikes' deve ser number")
        if(typeof createdAt !== "string")throw new BadRequestError("A data de criação não deve ser preenchida")
        if(typeof updatedAt !== "string")throw new BadRequestError("A data de criação não deve ser preenchida")
        if(typeof creatorId !== "string")throw new BadRequestError("O id do criador deve ser string")
        if(typeof creatorName !== "string")throw new BadRequestError("O nome do criador deve ser string")

        const dtoPost:CreatePostInputDTO ={
            id,
            content,
            likes,
            dislikes,
            createdAt,
            updatedAt,
            creatorId,
            creatorName
        }
        return dtoPost
    }

   public createPostOutputDTO(post:Posts):CreatePostOutputDTO{
        const dto: CreatePostOutputDTO ={
            mensagem: "Cadastro realizado",
            post:{
                id:post.getId(),
                content: post.getContent()
            }
        }
        return dto
   }
}