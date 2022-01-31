const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = require("../models/user.model");
const userController = require('../controllers/user.controller')
const checkAuth = require('../middleware/check-auth');

router.post('/signup', userController.createUser)

router.post("/login", userController.login)

router.delete("/:userId", checkAuth, userController.deleteUser)
module.exports = router