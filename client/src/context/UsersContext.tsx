import { createContext, ReactNode, useContext, useState } from "react";
import api from "../api";
import { useAlert } from "../hooks/useAlert";
import { User, UserCreate, UserUpdate } from "../models/User";

interface UserContextType {
  users: User[];
  getUsers: () => void;
  readUser: (userId: number) => Promise<User>;
  createUser: (user: User) => void;
  updateUser: (userId: number, updatedUser: User) => void;
  deleteUser: (userId: number) => void;
}

const UsersContext = createContext<UserContextType | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const { setAlert } = useAlert();

  const getUsers = async () => {
    try {
      const response = await api.get<User[]>("/users/?skip=0&limit=100");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (user: UserCreate) => {
    try {
      await api
        .post(`/users`, user)
        .then((value: any) =>
          setAlert({
            type: "success",
            text: value.data.message,
          })
        )
        .catch((error: any) =>
          setAlert({
            type: "error",
            text: error.response.data.detail,
          })
        )
        .finally(() => getUsers());
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (userId: number, user: UserUpdate) => {
    try {
      await api
        .put(`/users/${userId}`, user)
        .then((value: any) =>
          setAlert({
            type: "success",
            text: value.data.message,
          })
        )
        .catch((error: any) =>
          setAlert({
            type: "error",
            text: error.response.data.detail,
          })
        )
        .finally(() => getUsers());
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await api
        .delete(`/users/${userId}`)
        .then((value: any) =>
          setAlert({
            type: "success",
            text: value.data.message,
          })
        )
        .catch((error: any) =>
          setAlert({
            type: "error",
            text: error.response.data.detail,
          })
        )
        .finally(() => getUsers());
    } catch (error) {
      console.error(error);
    }
  };

  const readUser = async (userId: number) => {
    return await api
      .get<User>(`/users/${userId}`)
      .then((response) => response.data);
  };

  return (
    <UsersContext.Provider
      value={{ users, getUsers, readUser, createUser, updateUser, deleteUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};
