const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { userSchema } = require('./user.validation');
const userController = require('./user.controller');

const router = express.Router();

router.post('/', validationMiddleware(userSchema.register), userController.register);
router.post('/login', validationMiddleware(userSchema.login), userController.login);

module.exports = router;
