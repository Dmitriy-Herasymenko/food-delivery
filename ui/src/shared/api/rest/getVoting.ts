import { api } from "../makeRequest";

const getUrlLogin = "/voting";


export const GetVoting = async () => {
  try {
    const response = await api.get(getUrlLogin);
    return response;
  } catch (error: any) {
    console.error("error: ", error);
  }
};
