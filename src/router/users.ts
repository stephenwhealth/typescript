import express from 'express';

import { getAllUsers, getuserid, deleteuser, updateuser} from "../controllers/users"
import {isAuthenticated, currentuser} from "../middlewares/index"

export default(router: express.Router) => {
    router.get('/auth/users', isAuthenticated, getAllUsers);
    router.get('/auth/user/:id', getuserid);
    router.delete('/auth/user/:id', isAuthenticated, currentuser, deleteuser)
    router.put('/auth/user/:id', isAuthenticated, currentuser, updateuser)
}