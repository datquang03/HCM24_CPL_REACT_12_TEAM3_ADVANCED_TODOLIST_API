// UserContext.tsx
import React, { createContext, useContext, useState } from "react";
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
