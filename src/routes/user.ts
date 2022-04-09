/**
 * User managment routes
 * 
 * @since 1.0.0
 * @version 1.0.0
 */
import { Router } from 'express';
import UserController from '../controllers/user';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();
const user = new UserController();

router.post('/', user.create);
router.get('/', [checkJwt, checkRole(['admin'])], user.list);
router.get('/:id', [checkJwt, checkRole(['admin'])], user.userById);
router.put('/:id', [checkJwt, checkRole(['admin'])], user.update);
router.delete('/:id', [checkJwt, checkRole(['admin'])], user.delete);



export default router;