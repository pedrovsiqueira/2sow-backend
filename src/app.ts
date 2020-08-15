import './database/connection'
import userRoutes from './routes/users.routes'
import adminRoutes from './routes/admin.routes'
import express from 'express';
import cors from 'cors'

const app = express();
app.use(express.json())

app.use(cors())
app.use('/api/usuarios', userRoutes);
app.use('/api/auth', adminRoutes);

export default app;
