import { api } from "../makeRequest";

const getUrlLogin = "/users";

export const Users = async () => {
  try {
    const response = await api.get(getUrlLogin);
    return response;
  } catch (error: any) {
    console.error("Ошибка при выполнении запроса:", error);
    console.error("Детали ошибки:", error.response);
  }
};

export const GetUser = async (id:string) => {
  try {
    const response = await api.get(`${getUrlLogin}/${id}`);
    return response;
  } catch (error: any) {
    console.error("Ошибка при выполнении запроса:", error);
    console.error("Детали ошибки:", error.response);
  }
};

export const UpdateProfile = async (data:any) => {
  try {
    const response = await api.post(`${getUrlLogin}/update`, data);
    return response;
  } catch (error: any) {
    console.error("Ошибка при выполнении запроса:", error);
    console.error("Детали ошибки:", error.response);
  }
};
