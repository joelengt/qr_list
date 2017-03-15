
function routes(app) {
    var users = require('./admin/users/index.js');
    var check = require('./check/index.js');
    
    app.use('/users', users);
    app.use('/check', check);

}

module.exports = routes;
