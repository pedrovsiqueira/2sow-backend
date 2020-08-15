import { Router } from 'express';
import UsersController from '../controllers/userControllers';
import authenticate from '../middlewares/authentication';

const router = Router();
const usersController = new UsersController();

router.use(authenticate)

router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);
router.get('/', usersController.find);

export default router
