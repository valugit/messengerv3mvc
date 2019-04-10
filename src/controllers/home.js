import router from './../router'

export default () => {

  if (localStorage.getItem('myToken')) {
    router.navigate('/chatroom')
  } else {
    router.navigate('/login')
  }

}