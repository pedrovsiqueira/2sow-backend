import { Request, Response } from 'express';
import {userDataArray} from '../utils/requiredFiles'
import User from '../models/User';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      cpf,
      email,
      cep,
      rua,
      numero,
      bairro,
      cidade,
    } = request.body;

    for (const field of userDataArray) {
      if (!request.body[field]) {
        return response.status(400).json({
          message: 'Dados incompletos'
        })
      }
    }

    const newUser = {
      nome,
      cpf,
      email,
      endereco: {
        cep,
        rua,
        numero,
        bairro,
        cidade,
      }
    }

    try {
      const responseFromDb = await User.create(newUser);
      return response.status(201).json(responseFromDb)
    } catch (error) {
      console.log(error);
      return response.status(500).json({message: 'Falha ao criar o usuário'})
    }
  }

  public async find(request: Request, response: Response): Promise<Response>{

    try {
      const responseFromDb = await User.find({})

      if (responseFromDb.length === 0) {
        return response.status(404).json({message: 'Nenhum usuário encontrado'})
      }

      return response.status(200).json(responseFromDb);
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'Falha na requisição. Tente novamente'})
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const {nome,
      cpf,
      email,
      cep,
      rua,
      numero,
      bairro,
      cidade, } = request.body

    const updatedUser = {
      endereco: {
        cep,
        rua,
        numero,
        bairro,
        cidade,
      }
    }

    try {
      const responseFromDb = await User.findByIdAndUpdate(id, updatedUser, {new: true})

      if (!responseFromDb) {
        return response.status(400).json({message: 'Usuário não encontrado'})
      }

      return response.status(200).json(responseFromDb)
    } catch (error) {
      return response.status(500).json({message: 'Falha ao alterar usuário'})
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const responseFromDb = await User.findByIdAndDelete(id);

      if (!responseFromDb) {
        return response.status(400).json({ message: 'Usuário não encontrado' });
      }

      return response.status(200).json(responseFromDb);
    } catch (error) {
      return response.status(500).json({ message: 'Falha ao deletar usuário' });
    }
  }
}


