import type { IUserSignIn } from "@/models/IUserSignIn";
import axios from "axios";


const BASE_URL = "http://localhost:3000";

export async function signInUser(user: IUserSignIn) {
    try {
        console.log(user);
        const response = await axios.post<IUserSignIn>(`${BASE_URL}/users/signIn`, user);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}