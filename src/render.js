import mustache from 'mustache'

export default {
  page(view, params) {
    return new Promise((resolve) => {
      fetch(`../src/views/${view}`).then((data) => {
        data.text().then((data) => {
          document.querySelector('#app').innerHTML = mustache.render(data, params)
          resolve()
        })
      })
    })
  },

  message(view) {
    return new Promise((resolve) => {
      fetch(`../src/views/${view}`).then((messageHtml) => {
        messageHtml.text().then((data) => {
          resolve(data)
        })
      })
    })
  }

}