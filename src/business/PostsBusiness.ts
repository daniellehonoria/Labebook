import { PostDatabase } from "../database/PostsDatabase";
import { BadRequestError } from "../Errors/BadRequestError";
import { NotFoundError } from "../Errors/NotFoundError";
import {  CreatePostInputDTO, CreatePostOutputDTO, IPostDB, USER_ROLES } from "../interfaces";
import { Posts } from "../models/PostsModel";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostsBusiness{
    constructor(
        private postsDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager : TokenManager

    ){}
public getPosts = async()=>{
    const postsDB: IPostDB[] = await this.postsDatabase.findPosts()

    const posts = postsDB.map((postDB)=> new Posts(
        postDB.id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at,
        postDB.creator_id,
        postDB.creator_name
    ))
    return posts
}
public createPost = async (input:CreatePostInputDTO):Promise<void> =>{
    const {token, content} =input
 
    if (token === undefined)throw new BadRequestError("Espera-se um token")
    if(content.length < 2)throw new BadRequestError("Content deve ter ao menos 2 strings")

        const payload = this.tokenManager.getPayload(token)

    if(payload === null) throw new BadRequestError("Token inválido")
    if (typeof content !== "string") throw new BadRequestError("Content deve ser string")
    const id = this.idGenerator.generate()
    const createdAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()
    const creatorId =  payload.id
    const creatorName =  payload.name

    //instancia do post
    const newPost = new Posts(
        id, 
        content,
        0,
        0,
        createdAt,
        updatedAt,
        creatorId,
        creatorName
    ) 
    //modelagem da tabela
    const postToDB = newPost.toDBModelPosts()

    await this.postsDatabase.createPost(postToDB)

}
public editPost = async (input:any) =>{
    const {newId, token, newContent} =input
    const payload = this.tokenManager.getPayload(token)

    if (token === undefined)throw new BadRequestError("Espera-se um token")
    if (payload === null)throw new BadRequestError("token inválido")
    if(newContent === undefined)throw new BadRequestError("Content é obrigatório")
    if(typeof newContent !== "string")throw new BadRequestError("Content deve ser string")
    
    if(newId !== undefined){
        if(typeof newId !== "string")throw new BadRequestError("Id deve ser string")
        if(newContent.length < 2)throw new BadRequestError("Content deve possuir ao menos 2 caracteres")
    }

    const postsDBIdExists = await this.postsDatabase.findPostById(newId)
    if(!postsDBIdExists)throw new NotFoundError("Id não encontrado")

    const creatorId = payload.id
    const creatorName = payload.name

    const putPost = new Posts(
        postsDBIdExists.id, 
        postsDBIdExists.content,
        postsDBIdExists.likes,
        postsDBIdExists.dislikes,
        postsDBIdExists.created_at,
        postsDBIdExists.updated_at,
        creatorId,
        creatorName
    ) 
    //enquanto newId for thruty, não executa o putPost, quando for falsy, setId altera o valor de newId
    newId && putPost.setId(newId)
    newContent && putPost.setContent(newContent)

    const putPostDB = putPost.toDBModelPosts()

    await this.postsDatabase.upDatePostById(putPostDB)

}
public deletePost = async(input:any) =>{
    const {idToDelete, token} = input
    const payload = this.tokenManager.getPayload(token)
    const postDeleteDB = await this.postsDatabase.findPostById(idToDelete)

    if (token === undefined)throw new BadRequestError("token ausente")
    if (payload === null) throw new BadRequestError("token inválido")
    if(!postDeleteDB)throw new NotFoundError("Id não encontrado")

    const creatorId = payload.id
        if (payload.role !== USER_ROLES.ADMIN
            && postDeleteDB.creator_id !== creatorId
        ) {
            throw new BadRequestError("Apenas quem criou a playlist pode deletá-la")
        }
    await this.postsDatabase.deletedPostById(idToDelete)

}
}