import express from 'express';

import {registerfile, loginuser, logout} from '../controllers/authentication';
import { currentuser, isAuthenticated } from '../middlewares/index';
 
export default (router: express.Router) => {
    router.post('/auth/register', registerfile);
    router.post('/auth/login', loginuser)
    router.post('/auth/logout/:id',isAuthenticated, currentuser, logout)
};