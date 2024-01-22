import { api } from "../makeRequest";

const getUrlLogin = "/auth/login";

export const Login = async (params:any) => {
    try {
        const response = await api.post(getUrlLogin, params);
        return response;

      } catch (error:any) {
        console.error(error);
      }
}
