import { Request, Response } from 'express';
import { adminDataArray } from '../utils/requiredFiles';
import bcrypt from 'bcrypt';

import Admin from '../models/Admin';
import { genToken } from '../utils/tokenGenerator';

export default class AdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    for (const field of adminDataArray) {
      if (!request.body[field]) {
        return response.status(400).json({
          message: 'Dados incompletos',
        });
      }
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = {
        email,
        password: hash,
      };

      const responseFromDb = await Admin.create(newUser);
      return response.status(201).json({ token: genToken(responseFromDb) });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Falha ao criar o usuário' });
    }
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    for (const field of adminDataArray) {
      if (!request.body[field]) {
        return response.status(400).json({
          message: 'Dados incompletos',
        });
      }
    }

    try {
      const user = await Admin.findOne({ email });

      if (!user) {
        return response.status(400).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return response.status(400).json({ message: 'Senha inválida' });
      }

      return response.status(200).json({
        token: genToken(user),
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Erro ao tentar realizar o login' });
    }
  }
}
