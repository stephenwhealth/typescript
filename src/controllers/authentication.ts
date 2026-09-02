import express from "express";

import { random, authentication } from "../helpers/index"

import { getUserByEmail, createUser } from "../db/users";


// creating a new user
export const registerfile = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password, username} = req.body

        if(!email || !password || !username) {
            return res.sendStatus(400)
        }

        const existuser = await getUserByEmail(email)

        if(existuser){
            return res.status(400).json('user already exist') 
        }

        const salt = random();
        const createuser = await createUser ({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json(createuser).end();


    }catch(error){

        console.log(error);
        return res.status(400);
    }
}

// login a user

export const loginuser = async (req: express.Request, res: express.Response) => {

    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json('email and password needed to login')
    }

    const find = await getUserByEmail(email)

    if(!find) {
        return res.status(400).json('user does not exist')
    }

    return res.status(200).json({
       message: 'user loggin successfully',
       data: find 
    })

}