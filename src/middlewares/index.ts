import express from "express";
import { get, merge} from "lodash";

import { getUserBySessionToken } from "../db/users";


// checking if the user is logged in using cookies
export const isAuthenticated = async ( req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{

        const sessionToken = req.cookies['STEPHEN-AUTH'];

        if(!sessionToken) {
            return res.status(400).json("you are not logged in")
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser})

        return next(); 

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

// comparing the logged in user and the requested action user if there are same, using cookies

export const currentuser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{

        const {id} = req.params;

        // const current = get(req, 'identity._id');

        const current = (req as any).identity?._id;

        if(!current) {
            return res.status(403).json("you're not unthenticated");
        }
        if(current.toString() !== id) {
            return res.status(403).json('not same as logged in user');
        }

        next()

    }catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}