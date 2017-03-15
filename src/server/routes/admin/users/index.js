var express = require('express');
var route = express.Router();

var userController = require('../../../controllers/UserController/index.js');
var UserController = new userController();

route.get('/list', UserController.list);
route.get('/item/:id', UserController.item);
route.post('/create', UserController.create);
// route.put('/update/:id', UserController.update);
// route.delete('/delete/:id', UserController.delete);

route.put('/reset', UserController.reset);

module.exports = route;
