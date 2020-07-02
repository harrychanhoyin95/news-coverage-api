import UserModel from '../models/user';

export default class AuthService {
  async signUp({ name, email, password }) {
    console.log("name", name)
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("Email has been taken");
      }

      await UserModel.create({
        name,
        email,
        password,
      })
      return { user };
    } catch (e) {
      throw e;
    }
  }
}
