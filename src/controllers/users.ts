import express from 'express';

import { getUsers, getUserById, deleteUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try{

        const allUser = await getUsers();

        if(!allUser) {
            return res.status(400).json('no active users')
        }

        const numbers = allUser.length
        return res.status(200).json({
            message: `you have ${numbers} active users`,
            data: allUser
        })

    }catch(error){

        console.log(error);
        return res.sendStatus(403);
    }

}


export const getuserid = async (req: express.Request, res: express.Response) => {
    try{

        const {id} = req.params;

        if(typeof id !== 'string'){
            return res.status(400).json({ message: "Invalid user id" })
        }

        const userbyid = await getUserById(id)

        if(!userbyid){
            return res.status(404).json('user not found')

        } 

        return res.status(200).json(userbyid);

    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}

export const deleteuser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        if(typeof id !== 'string'){
            return res.status(400).json({ message: "Invalid user id" })
        }

        const deleteone = await deleteUserById(id)

        if(!deleteone) {
            return res.status(400).json('id not found')
        }

        res.status(200).json({
            message: 'deleted successfully', 
            data: deleteone
        })

    }catch(error) {
        console.log(error);
        return res.sendStatus(403)
    }

}