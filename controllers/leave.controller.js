const {Leave} = require("../models");
const { Op } = require("sequelize");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const controller = {};



controller.dashboard = async function (req, res) {
    try {
        const userData = await Leave.count({
            where: {UserId: req.user.id}
        });
        
             res
                .status(200)
                .json({ message: "Leave list", data: {totalLeave: 18, applied: userData, avilable: 18 - userData} });
        
    } catch (error) {
        console.log('error', error)
        res.status(404).json({ message: error });
    }
};
controller.getAll = async function (req, res) {
    try {
        console.log(req.user);
        const where = req.user.role == 'employee' ? {UserId: req.user.id} : {}
        const userData = await Leave.findAll({
            where
        });
        if (userData.length > 0) {
             res
                .status(200)
                .json({ message: "Leave list", data: userData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        console.log('error', error)
        res.status(404).json({ message: error });
    }
};

controller.create = async function (req, res) {
    try {
        const userData = await Leave.create(
             {date: req.body.date,type: req.body.type, UserId: req.user.id}
        );
        if (userData) {
             res
                .status(200)
                .json({ message: "Leave applied successfully!", data: userData });
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
        const userData = await Leave.update({date: req.body.date, type: req.body.type}, {
            where: {
              id: req.params.id, status: 'pending'
            }
        });
        if (userData) {
             res
                .status(200)
                .json({ message: "Leave updated successfully!"});
        } else {
            res.status(200).json({ message: "Leave not updated!", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};


controller.statusUpdate = async function (req, res) {
    try {
        const userData = await Leave.update({status: req.body.status}, {
            where: {
              id: req.params.id, status: 'pending'
            }
        });
        if (userData) {
             res
                .status(200)
                .json({ message: "Leave updated successfully!"});
        } else {
            res.status(200).json({ message: "Leave not updated!", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.delete = async function (req, res) {
    try {

        const userData = await Leave.destroy({
            where: {
              id: req.params.id,
              status: 'pending'
            }
          });
        if (userData) {
             res
                .status(200)
                .json({ message: "Leave deleted successfully!"});
        } else {
            res.status(400).json({ message: "Leave not deleted!", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.getOne = async function (req, res) {
    try {

        const userData = await Leave.findOne({where: {
            id: req.params.id
        }});
        if (userData) {
             res
                .status(200)
                .json({ message: "Leave get successfully!", data: userData});
        } else {
            res.status(400).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};



module.exports = controller;