import type { IUser } from "@/models/IUser";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function registerUser(user: IUser) {
    try {
        const response = await axios.post<IUser>(`${BASE_URL}/users/createUser`, user);
        return response.data;
    } catch (error) {
        return error;
    }
}