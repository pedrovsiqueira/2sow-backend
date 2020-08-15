import { Router } from 'express'
import AdminController from '../controllers/adminController';

const router = Router();
const adminController = new AdminController();


router.post('/signup', adminController.create);
router.post('/login', adminController.login);

export default router;
