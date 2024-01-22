import { api } from "../makeRequest";

const getUrlLogin = "/auth/registration";

export const RegistrationApi = async (params:any) => {
    try {
       const response = await api.post(getUrlLogin, params);
       return response;

      } catch (error:any) {
        console.error("error: ", error);
      }


}