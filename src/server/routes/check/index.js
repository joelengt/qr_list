var express = require('express');
var route = express.Router();

var itemsController = require('../../controllers/ItemsController/index.js');
var ItemsController = new itemsController();

route.post('/status', ItemsController.list);

module.exports = route;
