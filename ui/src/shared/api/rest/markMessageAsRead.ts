import { api } from "../makeRequest";

const getUrlLogin = "/users/mark-messages-read";

interface ParamsRequest {
    userId: string,
    messageId: string
}

export const MarkMessageAsRead = async (params: ParamsRequest) => {
  try {
    const response = await api.post(getUrlLogin, params);
    return response;
  } catch (error: any) {
    console.error("error: ", error);
  }
};
