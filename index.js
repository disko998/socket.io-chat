var socket = io('http://localhost:3000')

var form = document.getElementById('send-container')
var messageInput = document.getElementById('message-input')
var messageContainer = document.getElementById('message-container')

var username = prompt('What is your name?')
username = username ? username : 'Guest'

appendMessage('You join conversation', 'info', getTimeSpan())
socket.emit('new-user', username)

socket.on('user-connected', name => {
    appendMessage(`${name} join conversation`, 'info', getTimeSpan())
})

form.addEventListener('submit', e => {
    e.preventDefault()

    if (validateForm()) {
        var message = { data: messageInput.value, date: getTimeSpan() }

        appendMessage(message.data, 'myMessage', message.date)
        socket.emit('chat-message-send', message)
    }

    messageInput.value = ''
})

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message.data}`, 'userMessage', data.message.date)
})

function appendMessage(message, type, date) {
    const messageBoxElement = document.createElement('div')
    const messageElement = document.createElement('p')
    const dateContainer = document.createElement('span')

    messageElement.innerText = message
    dateContainer.innerText = date

    messageBoxElement.classList.add('message')
    messageBoxElement.classList.add(type)
    dateContainer.classList.add('date')

    messageElement.append(dateContainer)
    messageBoxElement.append(messageElement)
    messageContainer.append(messageBoxElement)

    scrollToBottom()
}

function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

function getTimeSpan() {
    var myDate = new Date()
    var minutes = myDate.getMinutes()
    var hours = myDate.getHours()

    return `${hours}:${minutes}`
}

function validateForm() {
    if (messageInput.value.trim()) {
        return true
    }

    return false
}
