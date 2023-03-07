export interface IUser {
  _id?: string;
  email: string;
  fullname: string;
  password: string;
  permissions: string;
  subordinates: string[];
}

export interface IChangeBoss {
  fromEmail: string;
  subordinate: string;
  toEmail: string;
}
