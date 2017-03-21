var Users = require('../../models/users/index.js')
var jwt = require('jsonwebtoken')

var qr = require('qr-image');

var fs = require('fs');

function file(name) {
    return fs.createWriteStream('./uploads/qrs/' + name);
}

class UserController {
    list(req, res) {

        Users.find((err, users) => {
            if(err) {
                return console.log(err);
            }

            res.status(200).json({
                status: 'users list',
                list: users
            })

        });

    }
    item(req, res) {
        var id = req.params.id;

        Users.findOne({'_id': id}, (err, user) => {
            if(err) {
                return console.log(err);
            }

            res.status(200).json({
                status: 'user item - ' + id,
                user: user
            })

        });

    }
    create(req, res) {

        // Body data
        var user = {
            names:         req.body.names || '',
            last_names:    req.body.last_names || '',
            full_name:     '',
            photo:         {},
            dni:           req.body.dni || '',
            email:         req.body.email || '',
            username:      req.body.username || '',
            password:      req.body.password || '',
            permiso:       'worker',
            token_auth:    '',
            refrest_token: ''
        }

        user.full_name = `${ user.names } ${ user.last_names }`;

        var worker_new = new Users(user);

        worker_new.save((err, user_saved) => {
            if(err) {
                return console.log(err);
            }

            user_saved.token_auth = jwt.sign(user_saved, process.env.JWT_SECRET || "casita")

            // Generate code QR
            var ec_level = 'Q';

            qr.image(`${ user_saved._id }`, { type: 'png', ec_level: ec_level, parse_url: false, margin: 1}).pipe(file(`${ user_saved._id }.png`));

            user_saved.save((err, user_saver2) => {
                 if(err) {
                     return console.log(err);
                 }

                 res.status(200).json({
                     status: 'user create',
                     user: user_saver2
                 })

            }); 

        })


    }
    update(req, res) {
        var id = req.params.id;

        res.status(200).json({
            status: 'user update - ' + id
        })
    }
    delete(req, res) {

        var id = req.params.id;

        res.status(200).json({
            status: 'user delete - ' + id
        })
    }

    reset(req, res) {
        
        Users.find((err, users) => {
            if(err) {
                return console.log(err);
            }

            for(var i = 0; i <= users.length - 1; i++) {
                var el = users[i];

                users[i].status_connect = false;

                users[i].save((err, result) => {
                    if(err) {
                        return console.log(err);
                    }
                })

            }

            res.status(200).json({
                status: 'users - code QR - reset'
            })

        });

    }

    listView(req, res) {

        Users.find((err, users) => {
            if(err) {
                return console.log(err);
            }

            res.render('./admin/users/lista/index.jade', {
                users: users
            })

        });

    }

    listCheckStatusView(req, res) {
        Users.find((err, users) => {
            if(err) {
                return console.log(err);
            }

            var users_status_true = [];

            users_status_true = users.filter((element) => {
                return element.status_connect === true
            })

            res.render('./admin/users/listaCheckStatus/index.jade', {
                users: users_status_true
            })

        });
    }
}

module.exports = UserController;