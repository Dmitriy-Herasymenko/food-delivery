import { api } from "../makeRequest";

const getUrlLogin = "/auth/response";

export const Registration = async (params:any) => {
    try {
       const response = await api.post(getUrlLogin, params);
       return response;

      } catch (error:any) {
        console.error("error: ", error);
      }


}