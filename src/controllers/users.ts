import express from 'express';

import { random, authentication } from "../helpers"

import { getUsers, getUserById, deleteUserById, updateUserById } from '../db/users';
import { ReturnDocument } from 'mongodb';


// getting all users

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


// getting a user by id

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


// deleting a user

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

// updating a username of a particular user

export const updateduser = async (req: express.Request, res: express.Response) => {
    try{

        const {id} = req.params;

        if(typeof id !== 'string'){
            return res.status(400).json({ message: "Invalid user id" })
        }

        const available  = await getUserById(id)

        if(!available) {
            return res.status(400).json('user is not available on the database')
        }

        const {username} = req.body

        available.username = username
        await available.save();

        return res.status(200).json({
            message: 'username updated successfully',
            info: available
        })

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// OR update the full info or just a password

export const updateuser = async (req: express.Request, res: express.Response) => {
    try{

        const {id} = req.params;

        if(typeof id !== 'string'){
            return res.status(400).json({ message: "Invalid user id" })
        }

        const available  = await getUserById(id).select('+authentication.password +authentication.salt')


        if(!available) {
            return res.status(400).json('user is not available on the database')
        }

        const {username, email, password} = req.body

        
        const newprofile: any = {
            username: username ?? available.username,
            email: email ?? available.email
        }

        // change password if the password is included
        if (password) {
            const salt = random();

            newprofile.authentication = {
                salt,
                password: authentication(salt, password)
            };
        }

   
        const updated = await updateUserById(id, newprofile, {returnDocument: 'after'})

        return res.status(200).json({
            message: 'you successfully updated your profile',
            info: updated
        })

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}