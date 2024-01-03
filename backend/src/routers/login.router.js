const { Router } = require('express');
const loginController = require('../controllers/login.controller');

const loginRouter = Router();

loginRouter.post('/', loginController.userLogin);
loginRouter.get('/verify', loginController.verifyUser);

module.exports = loginRouter;