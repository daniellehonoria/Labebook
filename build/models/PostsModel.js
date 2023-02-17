"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
class Posts {
    constructor(id, content, likes, dislikes, createdAt, updatedAt, creatorId, creatorName) {
        this.id = id;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
    }
    getLike() {
        return this.likes;
    }
    setLike(value) {
        this.likes = value;
    }
    getDislike() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setUpdatedAt(value) {
        this.updatedAt = value;
    }
    getCreatorId() {
        return this.creatorId;
    }
    setCreatorId(value) {
        this.creatorId = value;
    }
    getCreatorName() {
        return this.creatorName;
    }
    setCreatorName(value) {
        this.creatorName = value;
    }
    toDBModelPosts() {
        return {
            id: this.id,
            creator_id: this.creatorId,
            creator_name: this.creatorName,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
    toBusinessModelPost() {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        };
    }
}
exports.Posts = Posts;
//# sourceMappingURL=PostsModel.js.map