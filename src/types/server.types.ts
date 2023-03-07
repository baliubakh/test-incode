export interface IServerResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export interface IErrorBody {
  success: boolean;
  status?: number;
  data?: any;
  message?: string;
}
