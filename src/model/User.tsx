/* eslint-disable react-hooks/rules-of-hooks */

import useGet from "../api/useGet";
import usePost from "../api/usePost";
import usePut from "../api/usePut";
import useDelete from "../api/useDelete";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createDate: Date;
  updateDate: Date;
}

class User implements UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createDate: Date;
  updateDate: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    avatar: string,
    createDate: Date,
    updateDate: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar || "https://example.com/default-avatar.jpg";
    this.createDate = createDate;
    this.updateDate = updateDate;
  }

  static async getAll() {
    try {
      const users = await useGet("/user");
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getById(id: string) {
    try {
      const user = await useGet(`/user/${id}`);
      return user;
    } catch (error) {
      if (error === 404) {
        console.error("User not found:", error);
        return "User not found";
      } else {
        console.error("Error fetching user:", error);
        throw error;
      }
    }
  }

  static async create(data: { name: string; email: string; password: string }) {
    const currentDate = new Date().toString();
    const updatedDate = new Date().toString();
    const userData = {
      ...data,
      createDate: currentDate,
      updateDate: updatedDate,
    };
    try {
      const response = await usePost("/user", userData);
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async update(
    id: string,
    data: { name: string; email: string; password: string }
  ) {
    const updatedDate = new Date().toString();
    const userData = {
      ...data,
      updateDate: updatedDate,
    };
    try {
      const response = await usePut(`/user/${id}`, userData);
      console.log("Updated user from server:", response);
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const response = await useDelete(`/user/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  static async login(email: string, password: string) {
    try {
      const users = await useGet("/user");
      const user = users.find((user: User) => user.email === email);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.password !== password) {
        throw new Error("Invalid password");
      }

      // Lưu thông tin người dùng vào sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));

      console.log("Logged in as:", user);
      return user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
}

export default User;
