const socket = io()

let user

const chatbox = document.querySelector('#chatBox')

Swal.fire({
    title: 'Identificate con tu email',
    input: 'text',
    text: 'Ingresa el mail para identificarte',
    inputValidator: (value) => {
        return !value && "Necesitas escribir un mail para identificarte"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    return user
})

chatbox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter') {
        if(chatbox.value.trim().length > 0) {
            console.log('el ususario es: ' + user)
            socket.emit('message', {
                user,
                message: chatbox.value
            })
        }
    }
})

socket.on('messageLogs', data => {
    if(!user) return console.log('usuario no encontrado')
    let log = document.getElementById('messageLogs')
    let messages = ""
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message} <br/>`
    });
    log.innerHTML = messages
})