import User from "../model/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = { userName: request.body.userName, name: request.body.name, password: hashedPassword }
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ userName: request.body.userName })
    if (!user) {
        return response.status(400).json({ msg: "User not found" })
    }
    try {
        const match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: "30m"} )
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({token : refreshToken});

            await newToken.save();

            return response.status(200).json({accessToken: accessToken, refreshToken:refreshToken, name : user.name, userName : user.userName});
        }
        else {
            return response.status(400).json({ msg: "Password does not match" })
        }
    } catch (e) {
        console.log("Error while logging in", e);
    }
}

