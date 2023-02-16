export enum USER_ROLES{
    NORMAL="NORMAL",
    ADMIN="ADMIN"
}

export interface IUsersDB{
    id: string,
    name: string,
    email:string,
    password: string,
    role: string,
    created_at: string
}
export interface UserModel{
    id: string,
    name: string,
    email:string,
    password: string,
    role: string,
    createdAt: string
}
export interface IPostDB{
    id: string,
    creator_id: string,
    creator_name:string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}
export interface PostsModel{
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator:{
        id:string,
        name:string
    }
   
}