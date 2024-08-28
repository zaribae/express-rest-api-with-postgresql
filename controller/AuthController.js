const { Op } = require("sequelize");
const user = require("../db/models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res, next) => {
    const data = req.body;

    if (![1, 2].includes(data.userType)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid User Type!'
        });
    }

    const userExists = await user.findOne({
        where: {
            email: data.email
        }
    });

    if (userExists) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists!'
        });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);

    const newUser = await user.create({
        userType: data.userType,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
    });

    const token = jwt.sign(
        {
            id: newUser.id,
            userType: newUser.userType,
            email: newUser.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1d"
        }
    );

    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            id: newUser.id,
            userType: newUser.userType,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            createdAt: newUser.createdAt
        },
        token
    });
};

module.exports = { register };

