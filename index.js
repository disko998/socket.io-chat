const socket = io('http://localhost:3000')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

const username = prompt('What is you name?')
appendMessage('You joined', 'info', new Date().toLocaleDateString())
socket.emit('new-user', username)

socket.on('user-connected', name => {
    appendMessage(`${name} just joined`, 'info', new Date().toLocaleDateString())
})

form.addEventListener('submit', e => {
    e.preventDefault()
    const message = {data: messageInput.value, date: new Date().toLocaleDateString()}
    appendMessage(message.data, 'myMessage', message.date)
    socket.emit('chat-message-send', message)
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
    console.log(messageContainer.scrollHeight)
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
 }

