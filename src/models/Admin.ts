import { Schema, Document, model } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  password: string;
}

const AdminSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = model<IAdmin>('Admin', AdminSchema);

export default Admin;
