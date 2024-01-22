import { api } from "../makeRequest";

const getUrlLogin = "/voting/createVote";

interface ParamsRequest {
  id: string;
  userId: string;
  idVote: string;
}

export const VoteOption = async (params: ParamsRequest) => {
  try {
    const response = await api.post(getUrlLogin, params);
    return response;
  } catch (error: any) {
    console.error("error: ", error);
  }
};
