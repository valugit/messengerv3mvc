export default {
  getToken(email, pwd) {
    return new Promise((resolve) => {

      fetch('http://edu2.shareyourtime.fr/apijsv2/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'email=' + email + '&password=' + pwd
      }).then((resp) => {
        resp.json().then((json) => {
          localStorage.setItem('username', email.match(/.+?(?=\.)/))
          localStorage.setItem('myToken', json.data.token)
          resolve(json)
        })
      })

    })

  },
  getMessages() {
    return new Promise((resolve) => {

      fetch('http://edu2.shareyourtime.fr/apijsv2/messages', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('myToken')
        }
      }).then((resp) => {
        resp.json().then((json) => {
          resolve(json)
        })
      }).catch((errors) => {
        console.error(errors)
      })
    })
  },
  postMessage(message) {
    return new Promise((resolve) => {

      fetch('http://edu2.shareyourtime.fr/apijsv2/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('myToken')
          },
          body: 'message=' + message + '        '
        })
    })
  }
}