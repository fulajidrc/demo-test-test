const {User} = require("../models");
const { Op } = require("sequelize");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const controller = {};

controller.getAll = async function (req, res) {
    try {
        const userData = await model.user.findAll();
        if (userData.length > 0) {
             res
                .status(200)
                .json({ message: "User list", data: userData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.create = async function (req, res) {
    try {
        const where = {
            username: req.body.username
        }
        const checkUser = await getOneUser(where);
        if(checkUser){
            return res.status(400).send(
                {
                    message: 'Username all ready exits!'
                }
            );
        }
        const hash = await bcrypt.hash(req.body.password, parseInt(process.env.SALTROUND))
        const userData = await model.user.create({
            username: req.body.username, 
            password: hash
        });
        if (userData) {
             res
                .status(200)
                .json({ message: "User created successfully!", data: userData });
        } else {
            res.status(200).json({ message: "User not created!", data: [] });
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ message: error });
    }
};

controller.update = async function (req, res) {
    try {
        const where = {
            username: req.body.username,
            id: {
                [Op.ne]: req.params.id
            }
        }
        const checkUser = await getOneUser(where);
        if(checkUser){
            return res.status(400).send(
                {
                    message: 'Username all ready exits!'
                }
            );
        }
        const hash = await bcrypt.hash(req.body.password, parseInt(process.env.SALTROUND))
        const userData = await model.user.update({ 
            username: req.body.username, 
            password: hash
        }, {
            where: {
              id: req.params.id
            }
        });
        if (userData) {
             res
                .status(200)
                .json({ message: "User updated successfully!"});
        } else {
            res.status(200).json({ message: "User not updated!", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};


controller.delete = async function (req, res) {
    try {

        const userData = await model.user.destroy({
            where: {
              id: req.params.id
            }
          });
        if (userData) {
             res
                .status(200)
                .json({ message: "User deleted successfully!"});
        } else {
            res.status(400).json({ message: "User not deleted!", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.getOne = async function (req, res) {
    try {

        const userData = await getOneUser({
            id: req.params.id
        });
        if (userData) {
             res
                .status(200)
                .json({ message: "User get successfully!", data: userData});
        } else {
            res.status(400).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.generateToken = async (req, res) => {
    console.log(req.body.refreshToken);
    const decoded = await jwt.verify(req.body.refreshToken,  process.env.JWT_KEY);

    const userData = await User.findOne({ where: {
        id: decoded.id
    }});
    const token = jwt.sign({ 
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role, 
        createdAt: userData.createdAt,
     }, process.env.JWT_KEY, 
     { expiresIn: 10 * 60 });


    res.status(200)
                .json({ 
                    message: "access token!", 
                    data: userData,
                    token: token,
                });
}

controller.login = async function (req, res) {
    try {
        const userData = await User.findOne({ where: {
            email: req.body.email
        }});

        if (userData) {
            const checkPassword = await bcrypt.compare(req.body.password, userData.password);
            if(checkPassword){
                //token expire in one hour
                const token = jwt.sign({ 
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role, 
                    createdAt: userData.createdAt,
                 }, process.env.JWT_KEY, 
                 { expiresIn: 10 * 10 * 60 });

                 const refreshToken = jwt.sign({ 
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role, 
                    createdAt: userData.createdAt,
                 }, process.env.JWT_KEY, 
                 { expiresIn: 24 * 60 * 60 });
                 res.cookie('loginToken', token)
                res
                .status(200)
                .json({ 
                    message: "User login successfully!", 
                    data: userData,
                    token: token,
                    refreshToken
                });
            } else{
                res
                .status(400)
                .json({ message: "Please enter valid username or password!"});
            }
        } else {
            res.status(400).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        console.log('error', error);
        res.status(404).json({ message: error });
    }
};

controller.verify = async function (req, res) {
        res
        .status(200)
        .json({ 
            message: "Login verify!", 
            user: req.user
        });
};

controller.logout = async function (req, res) {
    res.clearCookie("loginToken");

    res
    .status(200)
    .json({ 
        message: "Logout successfully!", 
        user: req.user
    });
};

controller.signup = async function (req, res) {
    try {
        const checkUser = await User.findOne({where:{email: req.body.email}})
        if(checkUser){
            return res.status(400)
                .json({ 
                    message: "Email already exits!", 
                });
        }
        const hash = await bcrypt.hash(req.body.password, parseInt(process.env.SALTROUND))
        const userData = await User.create({...req.body, password: hash});
        if (userData) {
            return res.status(200)
                .json({ 
                    message: "Signup successfully!", 
                    data: userData,
                });
             } else {
            res.status(400).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        console.log('error', error);
        res.status(404).json({ message: error.message });
    }
};


module.exports = controller;

async function getOneUser(where){
    return new Promise(async (resolve) => {
        try{
            const userData = await model.user.findOne({
                where: where
            });
            resolve(userData);
        }catch(error){
            resolve(false);
        }
    })
}