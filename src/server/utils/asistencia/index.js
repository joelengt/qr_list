
module.exports.time = function (io) {

    console.log('Evento io general');

    // Connection all sockets
    this.connect = function () {
        io.on('connection', function (socket) {
            console.log(`Usuario de Campo Connectado a NOTIFICACIONES ${socket.id}`)

            // Connection por room
            socket.on('NotificationsRoom', function(NotificationsRoom) {
                console.log('Campo NOTIFICACIONES ROOM session Is : ' + NotificationsRoom)

                // Si el usuario ya esta suscrito a otro NotificationsRoom, sale de ese y se une al nuevo
                if(socket.NotificationsRoom) {
                    socket.leave(socket.NotificationsRoom)
                }

                // Uniendo al usuario al nuevo NotificationsRoom
                socket.NotificationsRoom = NotificationsRoom
                console.log('EL valor del socket.NotificationsRoom: ' + socket.NotificationsRoom)
                socket.join(NotificationsRoom)

            })

        })
    }

    this.notificar = function (message) {

        io.emit('notis_counter', message)

    }
}



