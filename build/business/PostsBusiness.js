"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsBusiness = void 0;
const BadRequestError_1 = require("../Errors/BadRequestError");
const NotFoundError_1 = require("../Errors/NotFoundError");
const PostsModel_1 = require("../models/PostsModel");
class PostsBusiness {
    constructor(postsDatabase, postDTO) {
        this.postsDatabase = postsDatabase;
        this.postDTO = postDTO;
        this.getPosts = () => __awaiter(this, void 0, void 0, function* () {
            const postsDB = yield this.postsDatabase.findPosts();
            const posts = postsDB.map((postDB) => new PostsModel_1.Posts(postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, postDB.creator_id, postDB.creator_name));
            return posts;
        });
        this.createPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, content, likes, dislikes, createdAt, updatedAt, creatorId, creatorName } = input;
            if (id.length < 2) {
                throw new BadRequestError_1.BadRequestError("id deve ter ao menos 2 strings");
            }
            if (content.length < 2) {
                throw new BadRequestError_1.BadRequestError("Content deve ter ao menos 2 strings");
            }
            const postsDBIdExists = yield this.postsDatabase.findPostById(id);
            if (postsDBIdExists) {
                throw new BadRequestError_1.BadRequestError("Id já existe");
            }
            const newPost = new PostsModel_1.Posts(id, content, likes, dislikes, createdAt, updatedAt, creatorId, creatorName);
            const postToDB = newPost.toDBModelPosts();
            yield this.postsDatabase.createPost(postToDB);
            const output = this.postDTO.createPostOutputDTO(newPost);
            return output;
        });
        this.editPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { newId, newContent, likes, dislikes, createdAt, updatedAt, creatorId, creatorName } = input;
            if (newId !== undefined) {
                if (typeof newId !== "string") {
                    throw new BadRequestError_1.BadRequestError("Id deve ser string");
                }
                if (newContent.length < 2) {
                    throw new BadRequestError_1.BadRequestError("Content deve possuir ao menos 2 caracteres");
                }
            }
            const postsDBIdExists = yield this.postsDatabase.findPostById(newId);
            if (!postsDBIdExists) {
                throw new NotFoundError_1.NotFoundError("Id não encontrado");
            }
            const putPost = new PostsModel_1.Posts(postsDBIdExists.id, postsDBIdExists.content, postsDBIdExists.likes, postsDBIdExists.dislikes, postsDBIdExists.created_at, postsDBIdExists.updated_at, postsDBIdExists.creator_id, postsDBIdExists.creator_name);
            newId && putPost.setId(newId);
            newContent && putPost.setContent(newContent);
            const postToDB = putPost.toDBModelPosts();
            yield this.postsDatabase.upDatePostById(postToDB);
            const output = "Post criado";
            return output;
        });
        this.deletePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToDelete } = input;
            const postDeleteDB = yield this.postsDatabase.findPostById(idToDelete);
            if (!postDeleteDB) {
                throw new NotFoundError_1.NotFoundError("Id não encontrado");
            }
            yield this.deletePost(postDeleteDB.id);
            const output = "Post deletado";
            return output;
        });
    }
}
exports.PostsBusiness = PostsBusiness;
//# sourceMappingURL=PostsBusiness.js.map