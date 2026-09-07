import express from 'express';

import { getAllUsers, getuserid, deleteuser} from "../controllers/users"
import {isAuthenticated} from "../middlewares/index"

export default(router: express.Router) => {
    router.get('/auth/users', isAuthenticated, getAllUsers);
    router.get('/auth/user/:id', getuserid);
    router.delete('/auth/user/:id', deleteuser)
}