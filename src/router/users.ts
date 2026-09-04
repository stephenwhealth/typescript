import express from 'express';

import { getAllUsers, getuserid} from "../controllers/users"

export default(router: express.Router) => {
    router.get('/auth/users', getAllUsers);
    router.get('/auth/user/:id', getuserid)
}