import { IPostDB } from "../interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

public async findPosts(){
    const postDB: IPostDB[] = await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    return postDB
}
public async createPost(newPostDB:IPostDB){
    await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .insert(newPostDB)
}
public async findPostById(id:string){
    const [postDB]:IPostDB[] | undefined[] = await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .where({id})
    return postDB
}
public async upDatePostById(postDB:IPostDB){
    await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .update(postDB)
    .where({id: postDB.id})
}
public async deletedPostById(id:string){
    await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .delete()
    .where({id})
}
}