import mustache from 'mustache'

export default {
  createMessage(json, messageHtml, i) {
    let time = new Date(json.data[i].created_at)
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: 'true'
    }

    let message = new DOMParser().parseFromString(mustache.render(messageHtml, {
      id: json.data[i].id,
      name: json.data[i].nickname,
      content: json.data[i].message,
      date: time.toLocaleDateString('en-GB', options)
    }), 'text/html').firstChild

    let ul = document.querySelector('#messages')
    let li = message.querySelector('li')
    let username = li.querySelector('span:first-of-type')

    if (localStorage.getItem(json.data[i].nickname + 'color')) {
      username.style.color = localStorage.getItem(json.data[i].nickname + 'color')
    } else {
      username.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16)
      localStorage.setItem(json.data[i].nickname + 'color', username.style.color)
    }

    ul.appendChild(li)
    ul.scrollTop = ul.scrollHeight

    localStorage.setItem('lastMessageId', json.data[i].id)
  }
}