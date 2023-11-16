import { api } from "../makeRequest";

const getUrlLogin = "/auth/login";

export const Login = async (params:any) => {
    try {
        console.log("params", params)

        const response = await api.post(getUrlLogin, params);
        console.log("response", response)

      } catch (error:any) {
        console.error("Ошибка при выполнении запроса:", error);
        console.error("Детали ошибки:", error.response); 
      }


}