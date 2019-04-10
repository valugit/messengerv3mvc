import router from './../router'
import render from './../render'
import api from '../api'

export default () => {
  render.page('login.html', {}).then(() => {

    document.querySelector('#login').addEventListener('click', () => {
      let email = document.querySelector('input[type="email"]').value
      let pwd = document.querySelector('input[type="password"]').value

      api.getToken(email, pwd).then(() => {
        router.navigate('/')
      })
    })
    
  })
}