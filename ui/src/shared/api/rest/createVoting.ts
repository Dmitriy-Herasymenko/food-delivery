import { api } from "../makeRequest";

const getUrlLogin = "/voting";

interface Option {
  option: string;
  description: string;
}

interface ParamsRequest {
  userId: string;
  isOpen: boolean;
  startDate: string;
  endDate: string;
  title: string;
  votes: Option[];
}

export const CreateVoting = async (params: ParamsRequest) => {
  try {
    const response = await api.post(getUrlLogin, params);
    return response;
  } catch (error: any) {
    console.error("error: ", error);
  }
};
