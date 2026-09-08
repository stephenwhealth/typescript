import express from "express";

import { random, authentication } from "../helpers"

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

    try {
        const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json('email and password needed to login')
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

    if(!user) {
        return res.status(400).json('user does not exist')
    }

    if (!user.authentication || !user.authentication.salt || !user.authentication.password) {
        return res.status(400).json({
            message: "User authentication data is missing"
    });
}

    const expectedHash = authentication(user.authentication.salt, password);

    if(user.authentication.password !== expectedHash){
        return res.status(403).json('incorrect password');
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('STEPHEN-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});

    return res.status(200).json({
       message: 'user loggin successfully',
       data: user 
    })

    }catch(error){
        console.log(error)
        return res.sendStatus(400)
    }

}