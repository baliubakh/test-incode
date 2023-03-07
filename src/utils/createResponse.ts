import { IServerResponse } from "../types/server.types";

export const CreateResponse = (data: any): IServerResponse => {
  return {
    success: true,
    data,
  };
};
