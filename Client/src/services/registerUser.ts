import type { IUser } from "@/models/IUser";
import { useShowPopUp } from "@/stores/ShowPopUpStore";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function registerUser(user: IUser) {
    try {
        const response = await axios.post<IUser>(`${BASE_URL}/users/createUser`, user);
        console.log(response);      
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400 && error.response.data.message === "Email is already registered.") {
            const showErrorPopUp = useShowPopUp();
            showErrorPopUp.showPopUpTab(true, "Woops, ser ut som att email adressen redan används. Vänligen logga in om du redan har ett konto")
          } else {
            console.log(error);
          }
    }
}