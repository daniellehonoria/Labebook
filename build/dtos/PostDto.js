"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDTO = void 0;
const BadRequestError_1 = require("../Errors/BadRequestError");
class PostDTO {
    createPostInput(id, content, likes, dislikes, createdAt, updatedAt, creatorId, creatorName) {
        if (id === undefined)
            throw new BadRequestError_1.BadRequestError("Id é obrigatório");
        if (typeof id !== "string")
            throw new BadRequestError_1.BadRequestError("'id' deve ser string");
        if (content === undefined)
            throw new BadRequestError_1.BadRequestError("Content é obrigatório");
        if (typeof content !== "string")
            throw new BadRequestError_1.BadRequestError("content deve ser string");
        if (typeof likes !== "number")
            throw new BadRequestError_1.BadRequestError("'likes' deve ser number");
        if (typeof dislikes !== "number")
            throw new BadRequestError_1.BadRequestError("'dislikes' deve ser number");
        if (typeof createdAt !== "string")
            throw new BadRequestError_1.BadRequestError("A data de criação não deve ser preenchida");
        if (typeof updatedAt !== "string")
            throw new BadRequestError_1.BadRequestError("A data de criação não deve ser preenchida");
        if (typeof creatorId !== "string")
            throw new BadRequestError_1.BadRequestError("O id do criador deve ser string");
        if (typeof creatorName !== "string")
            throw new BadRequestError_1.BadRequestError("O nome do criador deve ser string");
        const dtoPost = {
            id,
            content,
            likes,
            dislikes,
            createdAt,
            updatedAt,
            creatorId,
            creatorName
        };
        return dtoPost;
    }
    createPostOutputDTO(post) {
        const dto = {
            mensagem: "Cadastro realizado",
            post: {
                id: post.getId(),
                content: post.getContent()
            }
        };
        return dto;
    }
}
exports.PostDTO = PostDTO;
//# sourceMappingURL=PostDto.js.map