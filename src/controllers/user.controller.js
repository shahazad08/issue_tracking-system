const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = require("../models/user.model");



exports.createUser = (req, res, next) => {
    console.log("User Hits")
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail Exists"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash
                        })
                        user
                            .save()
                            .then(result => {
                                console.log("user result", result);
                                res.status(201).json({
                                    message: "User Created Sucessfully",
                                    
                                })
                            })
                            .catch(err => {
                                console.log("User Error", err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed1"
                })
            } // user[0] // return a single user 
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth Failed2'
                    })
                }
                if (result) {
                    const token = jwt.sign(                       // Payload
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,                      // key
                        {
                            expiresIn: "1h"
                        })

                    return res.status(200).json({             // options  

                        message: 'Auth successfull',
                        token: token,
                        _id: user[0]._id
                    })
                }
                res.status(401).json({
                    message: 'Auth Failed'
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

}

exports.deleteUser = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User Deleted"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
