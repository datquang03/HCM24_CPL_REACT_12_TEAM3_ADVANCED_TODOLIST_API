// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserInterface } from "../model/User"; // Đường dẫn đúng đến User model

interface UserContextType {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
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

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
