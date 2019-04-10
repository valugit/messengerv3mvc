import router from './../router'
import render from './../render'
import api from '../api'
import message from './../message'

export default () => {

  render.page('chatroom.html', {
    nickname: localStorage.getItem('username')
  }).then(() => {

    setInterval(() => {

      api.getMessages().then((json) => {

        render.message('message.html').then((messageHtml) => {

          let lastMessageId = localStorage.getItem('lastMessageId')

          if (lastMessageId == null) {
            for (let i = json.data.length - 1; i >= 0; i--) {
              message.createMessage(json, messageHtml, i)
            }
          } else {
            if (json.data[0].id != lastMessageId) {
              for (let j = json.data.length - 1; j >= 0; j--) {
                const element = json.data[j].id

                if (element == lastMessageId) {
                  for (let i = j - 1; i >= 0; i--) {
                    message.createMessage(json, messageHtml, i)
                  }

                  break
                }
              }
            }
          }

        })
      })
    }, 1000)

    document.querySelector('#send').addEventListener('keydown', (event) => {
      let sendMessage = document.querySelector('#send')

      if (event.keyCode === 13) {

        api.postMessage(sendMessage.value)

        sendMessage.value = ''
        event.preventDefault()
      }
    })

    document.querySelector('#logout').addEventListener('click', () => {
      localStorage.removeItem('myToken')
      localStorage.removeItem('lastMessageId')
      router.navigate('/login')
    })
  })
}