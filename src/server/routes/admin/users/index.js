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

// Render view - users list
route.get('/admin/usuarios', UserController.listView);

// Render view - users check status
route.get('/admin/usuarios/status', UserController.listCheckStatusView);

module.exports = route;
