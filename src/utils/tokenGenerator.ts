import jwt from 'jsonwebtoken';
import { IAdmin } from '../models/Admin';
import { JWT_SECRET } from '../configs/env';

export const genToken = (user: IAdmin) => {
  const { _id } = user;
  return jwt.sign({ _id }, JWT_SECRET);
};
