var Users = require('../../models/users/index.js')
var jwt = require('jsonwebtoken')

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
            password:      req.body.username || '',
            permiso:       'worker',
            token_auth:    '',
            refrest_token: ''
        }

        var worker_new = new Users(user);

        worker_new.save((err, user_saved) => {
            if(err) {
                return console.log(err);
            }

            user_saved.token_auth = jwt.sign(user_saved, process.env.JWT_SECRET || "casita")

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

                // Generate new code QR

                // Change status_connect to false
                 
            }

            res.stats(200).json({
                status: 'users - code QR - reset'
            })

        });

        
    }
}

module.exports = UserController;