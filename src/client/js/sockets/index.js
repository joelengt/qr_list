export function event () {
    
    console.log('NotificacionS')

    var socket = io('http://localhost:3000')

    socket.on('notis_counter', function(user) {
        console.log('Cantidad de Notificaciones')

        var template = `<article>
                          <div class="left">
                            <h3>${ user.full_name }</h3>
                            <figure><img src="../../../images/avatar.png" width="100"/></figure>
                          </div>
                          <div class="right">
                            <p><strong>dni:</strong> ${ user.dni }</p>
                            <p><strong>username:</strong> @${ user.username }</p>
                            <p><strong>status:</strong> ${ user.status_connect }</p>
                            <p><strong>Hora Entrada:</strong> ${ user.hora_entrada }</p>
                          </div>
                          <hr/>
                        </article>`;

        var contentArticles = document.querySelector('.usersList');

        contentArticles.innerHTML += template

        console.log(user)
    })

    socket.on('connect', function() {
        console.log('Me conete con el servidor')
       // Connected, let's sign-up for to receive messages for this room
       socket.emit('NotificationsRoom', 'NotificationsRoom')
    })


}