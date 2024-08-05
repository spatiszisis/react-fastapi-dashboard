import api from '../../../api';
import { useState } from 'react';

export const [usersList, setUsersList] = useState([]);

export const getUsers = async () => {
    const response = await api.get("/users/?skip=0&limit=100");
    setUsersList(response.data);
}

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/${id}`).finally(() => getUsers());
    return response.data;
}

export const updateUser = async (id: string, data: any) => {
    const response = await api.put(`/users/${id}`, data).finally(() => getUsers());
    return response.data;
}

export const createUser = async (data: any) => {
    const response = await api.post(`/users`, data).finally(() => getUsers());
    return response.data;
}