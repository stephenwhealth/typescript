import express from 'express';

import {registerfile, loginuser} from '../controllers/authentication';
import { getAllUsers, getuserid } from '../controllers/users'
 
export default (router: express.Router) => {
    router.post('/auth/register', registerfile);
    router.post('/auth/login', loginuser)
    router.get('/auth/allusers', getAllUsers)
    router.get('/auth/user/:id', getuserid)
};