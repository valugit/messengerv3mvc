import swal from 'sweetalert'
import LoginController from './controllers/login'
import ChatroomController from './controllers/chatroom'
import HomeController from './controllers/home'
import router from './router'

router
  .on({
    'login': LoginController,
    'chatroom': ChatroomController,
    '*': HomeController
  })
  .resolve()