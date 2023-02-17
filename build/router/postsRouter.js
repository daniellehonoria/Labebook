"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostsBusiness_1 = require("../business/PostsBusiness");
const PostController_1 = require("../controller/PostController");
const PostsDatabase_1 = require("../database/PostsDatabase");
const PostDto_1 = require("../dtos/PostDto");
exports.postsRouter = express_1.default.Router();
const postController = new PostController_1.PostController(new PostsBusiness_1.PostsBusiness(new PostsDatabase_1.PostDatabase(), new PostDto_1.PostDTO()), new PostDto_1.PostDTO());
exports.postsRouter.get("/", postController.getPosts);
exports.postsRouter.post("/", postController.createPost);
exports.postsRouter.put("/:id", postController.editPost);
exports.postsRouter.delete("/:id", postController.deletePost);
//# sourceMappingURL=postsRouter.js.map