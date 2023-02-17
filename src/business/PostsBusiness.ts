import { PostDatabase } from "../database/PostsDatabase";
import { PostDTO } from "../dtos/PostDto";
import { BadRequestError } from "../Errors/BadRequestError";
import { NotFoundError } from "../Errors/NotFoundError";
import {  CreatePostInputDTO, CreatePostOutputDTO, IPostDB } from "../interfaces";
import { Posts } from "../models/PostsModel";

export class PostsBusiness{
    constructor(
        private postsDatabase: PostDatabase,
        private postDTO: PostDTO
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
public createPost = async (input:CreatePostInputDTO):Promise<CreatePostOutputDTO> =>{
    const {id, content, likes, dislikes, createdAt, updatedAt,creatorId, creatorName} =input
 
    if(id.length < 2){
        throw new BadRequestError("id deve ter ao menos 2 strings")
    }
    if(content.length < 2){
        throw new BadRequestError("Content deve ter ao menos 2 strings")
    }
    const postsDBIdExists = await this.postsDatabase.findPostById(id)

    if (postsDBIdExists){
        throw new BadRequestError("Id já existe")
    }
    //instancia do post
    const newPost = new Posts(
        id, 
        content,
        likes,
        dislikes,
        createdAt,
        updatedAt,
        creatorId,
        creatorName
    ) 
    //modelagem da tabela
    const postToDB = newPost.toDBModelPosts()

    await this.postsDatabase.createPost(postToDB)

const output = this.postDTO.createPostOutputDTO(newPost)

 return output
}
public editPost = async (input:any) =>{
    const {newId, newContent, likes, dislikes, createdAt, updatedAt, creatorId, creatorName} =input

    if(newId !== undefined){
        if(typeof newId !== "string"){
        throw new BadRequestError("Id deve ser string")
        } if(newContent.length < 2){
            throw new BadRequestError("Content deve possuir ao menos 2 caracteres")
        }
    }

    const postsDBIdExists = await this.postsDatabase.findPostById(newId)

    if(!postsDBIdExists){
        throw new NotFoundError("Id não encontrado")
    }
    const putPost = new Posts(
        postsDBIdExists.id, 
        postsDBIdExists.content,
        postsDBIdExists.likes,
        postsDBIdExists.dislikes,
        postsDBIdExists.created_at,
        postsDBIdExists.updated_at,
        postsDBIdExists.creator_id,
        postsDBIdExists.creator_name
    ) 
    //enquanto newId for thruty, não executa o putPost, quando for falsy, setId altera o valor de newId
    newId && putPost.setId(newId)
    newContent && putPost.setContent(newContent)

    const postToDB = putPost.toDBModelPosts()

    await this.postsDatabase.upDatePostById(postToDB)

const output = "Post criado"

 return output

}
public deletePost = async(input:any) =>{
    const {idToDelete} = input

    const postDeleteDB = await this.postsDatabase.findPostById(idToDelete)

    if(!postDeleteDB){
        throw new NotFoundError("Id não encontrado")
    }
    await this.deletePost(postDeleteDB.id)

    const output ="Post deletado"
    return output
}
}