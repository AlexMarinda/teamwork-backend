import express from 'express';
import UserController from '../../controllers/user';

//import {verifyToken} from '../../helpers';



const router = express.Router();

router.post('/signup', UserController.registerUser);

router.post('/signin', UserController.login);
//router.patch('/admin/:user_id/',verifyToken,isAdmin, makeUserAdmin );

export default router;