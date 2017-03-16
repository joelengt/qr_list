
var Users = require('../../models/users/index.js')

class ItemsController {
    list(req, res) {

       var code_qr = req.body.code_qr;

       // Comprar el string con el token  (el token viene del QR)

       Users.findOne({'token_auth': code_qr}, (err, user) => {
          if(err) {
            return console.log('El usuario no se encontro, ' + err);
          }

          if(user !== null) {
            // si el usuario fue encontrado
               // cambiar su estado a true
               user.status_connect = true;

               user.save((err, user_saved) => {
                  if(err) {
                    return console.log(err);
                  }

                  res.status(200).json({
                      status: 'user check status'
                  })

               })

          } else {
            // si el usuario no fue encontrado
                // mostrar mensaje de fallo "401" - 

                res.status(404).json({
                    status: 'user Not Found'
                })

          }

       })

    }
}

module.exports = ItemsController;
