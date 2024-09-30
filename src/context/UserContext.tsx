import React, { createContext, useContext, useEffect, useState } from "react";
import { UserInterface } from "../model/User"; // Đường dẫn đúng đến User model
import User from "../model/User"; // Đường dẫn đúng đến API User

interface UserContextType {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
  fetchUserById: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ sessionStorage khi ứng dụng khởi động
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Hàm lấy thông tin người dùng từ server
  const fetchUserById = async (id: string) => {
    try {
      const fetchedUser = await User.getById(id);
      setUser(fetchedUser);
      // Cập nhật sessionStorage với thông tin mới
      sessionStorage.setItem("user", JSON.stringify(fetchedUser));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
