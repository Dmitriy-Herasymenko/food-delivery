import { api } from "../makeRequest";

const getUrlLogin = "/users";

export const Users = async () => {
    try {
 

        const response = await api.get(getUrlLogin);
        return response

      } catch (error:any) {
        console.error("Ошибка при выполнении запроса:", error);
        console.error("Детали ошибки:", error.response); 
      }


}