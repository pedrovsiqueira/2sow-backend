import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  nome: string;
  cpf: string;
  email: string;
  endereco: {
    cep: string;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
  };
}

const UserSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true,
  },
  endereco: {
    cep: {
      type: String,
      required: true,
    },
    rua: {
      type: String,
      required: true,
    },
    numero: {
      type: Number,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
  },
});

const User = model<IUser>('User', UserSchema);

export default User;
