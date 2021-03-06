/* eslint-disable no-useless-catch */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import createError from 'http-errors';

import UserModel from '../models/user';
import config from '../config';
export default class AuthService {
  async signUp({ name, email, password }) {
    const saltRounds = 10;

    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw createError(409, "Email has been taken");
      }

      const salt = await new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) reject(err);
          resolve(salt);
        });
      });
    
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });

      const userRecord = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        salt,
      });
      if (!userRecord) {
        throw createError(500, 'User cannot be created');
      }

      const selectedFieldUser = _.pick(userRecord, ['name', 'email']);
      const token = this.generateToken(userRecord);
      selectedFieldUser.token = token;

      return { user: selectedFieldUser };
    } catch (e) {
      throw e;
    }
  }

  async login({ email, password }) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw createError(404, "User not registered");
      }

      const isCorrectPassword = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      if (!isCorrectPassword) {
        throw createError(409, "Invalid Password");
      }

      const selectedFieldUser = _.pick(user, ['name', 'email']);
      const token = this.generateToken(user);

      selectedFieldUser.token = token;
      return { user: selectedFieldUser };
    } catch (e) {
      throw e;
    }
  }

  generateToken(user) {
    return jwt.sign(
      {
        _id: user.id,
        name: user.name,
      },
      config.jwtSecret
    );
  }
}
