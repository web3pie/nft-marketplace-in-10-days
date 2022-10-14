const { responseHelper } = require('../../helpers');
const userService = require('./user.service');

exports.register = async (req, res, next) => {
    try {
        const { body } = req;
        const response = await userService.register(body);
        return responseHelper.success(res, response);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { body } = req;
        const response = await userService.login(body);
        return responseHelper.success(res, response);
    } catch (error) {
        next(error);
    }
};
