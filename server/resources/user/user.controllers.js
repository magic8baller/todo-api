import User from './user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const create = async (req, res, next) => {
User.create({req.body})

}
