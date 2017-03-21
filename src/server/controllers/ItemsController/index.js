
var Users = require('../../models/users/index.js')

class ItemsController {
    list(req, res) {

       var code_qr = req.body.code_qr;

       Users.findOne({'_id': code_qr}, (err, user) => {
          if(err) {
            return res.status(404).json({
                    status: 'not_found',
                    message: 'Código QR no válido'
                })
          }

          if(user !== null) {
            // si el usuario fue encontrado
               if(user.status_connect === false) {
                   // cambiar su estado a true
                    user.status_connect = true;

                    user.hora_entrada = new Date()

                    user.save((err, user_saved) => {
                       if(err) {
                         return console.log(err);
                       }

                       // Evento socket.io

                       res.status(200).json({
                           status: 'new_check',
                           message: 'QR OK - ¡Usuario Check!'
                       })

                    })

               } else {

                    res.status(200).json({
                        status: 'user_checked',
                        message: 'El usuario ya esta marcado'
                    })

               }

          } else {
                res.status(404).json({
                    status: 'not_found',
                    message: 'Código QR no válido'
                })

          }

       })

    }
}

module.exports = ItemsController;
