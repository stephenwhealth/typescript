import express from 'express';

import {registerfile, loginuser} from '../controllers/authentication';
 
export default (router: express.Router) => {
    router.post('/auth/register', registerfile);
    router.post('/auth/login', loginuser)
};