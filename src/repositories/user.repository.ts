import { UserModel } from "../models";
import { IUser } from "../types/user.types";

class UserRepository {
  public getAllUsers() {
    return UserModel.find();
  }

  public getByFilter(filter: object) {
    return UserModel.find({ ...filter });
  }

  public updateById(_id: string, newData: IUser) {
    return UserModel.findByIdAndUpdate({ _id }, { ...newData });
  }

  public createNewUser(user: IUser) {
    return UserModel.create(user);
  }
}

export const userRepository = new UserRepository();
