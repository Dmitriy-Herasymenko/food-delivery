import { api } from "../makeRequest";

const getUrlLogin = "/users/send-message";

interface ParamsRequest {
  senderId: string,
  receiverId: string,
  content: string,
}

export const SentMessage = async (params: ParamsRequest) => {
  try {
    const response = await api.post(getUrlLogin, params);
    return response;
  } catch (error: any) {
    console.error("error: ", error);
  }
};
