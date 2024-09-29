/* eslint-disable react-hooks/rules-of-hooks */

import useGet from "../api/useGet";
import usePost from "../api/usePost";
import usePut from "../api/usePut";
import useDelete from "../api/useDelete";

export interface PostInterface {
  id: string;
  userId: string;
  title: string;
  content: string;
  status: string;
  createDate: Date;
  updateDate: Date;
}

class Post implements PostInterface {
  id: string;
  userId: string;
  title: string;
  content: string;
  status: string;
  createDate: Date;
  updateDate: Date;

  constructor(
    id: string,
    userId: string,
    title: string,
    content: string,
    status: string,
    createDate: Date,
    updateDate: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.status = status;
    this.createDate = createDate;
    this.updateDate = updateDate;
  }

  static async getAll() {
    try {
      const posts = await useGet("/post");
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  static async getById(id: string) {
    try {
      const post = await useGet(`/post/${id}`);
      return post;
    } catch (error) {
      if (error === 404) {
        console.error("Post not found:", error);
        return "Post not found";
      } else {
        console.error("Error fetching post:", error);
        throw error;
      }
    }
  }

  static async getPostByUserId(userId: string) {
    try {
      const posts = await useGet("/post");
      const userPosts = posts.filter(
        (post: PostInterface) => post.userId === userId
      );
      return userPosts;
    } catch (error) {
      console.error("Error fetching posts by user ID:", error);
      throw error;
    }
  }

  static async create(post: PostInterface) {
    try {
      const newPost = await usePost("/post", post);
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  static async update(post: PostInterface) {
    try {
      const updatedPost = await usePut(`/post/${post.id}`, post);
      return updatedPost;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  static async delete(userId: string ,id: string) {
    try {
      const response = await useDelete(`/user/${userId}/post/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
}

export default Post;
