import { Request, Response } from 'express';
import { userDataArray } from '../utils/requiredFiles';
import User from '../models/User';

interface IResults {
  results: {};
  next: {
    page: Number;
    limit: Number;
  };
  previous: {
    page: Number;
    limit: Number;
  };
  totalPages: Number;
}

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, cpf, email, cep, rua, numero, bairro, cidade } = request.body;

    console.log(request.body);
    for (const field of userDataArray) {
      if (!request.body[field]) {
        return response.status(400).json({
          message: 'Dados incompletos',
        });
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
      },
    };

    try {
      const responseFromDb = await User.create(newUser);
      return response.status(201).json(responseFromDb);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Falha ao criar o usuário' });
    }
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { searchValue, limit, page } = request.query;

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = Number(page) * Number(limit);
    const results: IResults = {} as IResults;

    try {
      let dbQuery = {
        nome: '',
      };

      if (searchValue && typeof searchValue === 'string') {
        dbQuery.nome = searchValue;
      }

      let responseFromDb = await User.find({
        nome: new RegExp(String(searchValue), 'i'),
      });

      if (endIndex < responseFromDb.length) {
        results.next = {
          page: Number(page) + 1,
          limit: Number(limit),
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: Number(page) - 1,
          limit: Number(limit),
        };
      }

      if (Number(limit) > responseFromDb.length) {
        results.totalPages = 1;
      } else {
        results.totalPages = Math.floor(responseFromDb.length / Number(limit));
      }


      results.results = responseFromDb.slice(startIndex, endIndex);

      console.log(results);
      if (responseFromDb.length === 0) {
        return response
          .status(404)
          .json({ message: 'Nenhum usuário encontrado' });
      }

      return response.status(200).json(results);
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: 'Falha na requisição. Tente novamente' });
    }
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const user = await User.findById(id).select('-password');
      console.log(user)
      return response.status(200).json(user);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Falha no servidor' });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { nome, cpf, email, cep, rua, numero, bairro, cidade } = request.body;

    const updatedUser = {
      endereco: {
        cep,
        rua,
        numero,
        bairro,
        cidade,
      },
    };

    try {
      const responseFromDb = await User.findByIdAndUpdate(id, updatedUser, {
        new: true,
      });

      if (!responseFromDb) {
        return response.status(400).json({ message: 'Usuário não encontrado' });
      }

      return response.status(200).json(responseFromDb);
    } catch (error) {
      return response.status(500).json({ message: 'Falha ao alterar usuário' });
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
