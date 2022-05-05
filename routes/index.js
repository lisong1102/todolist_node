const Router = require('koa-router')
const router = new Router() 
const controls = require('../controls/index')

//获取todoList数据
router.get('/todolist',controls.todoList.index.getTodoList)
//新增todoList数据
router.post('/add',controls.todoList.index.addTodoList)
//批量删除
router.get('/del',controls.todoList.index.deleteTodoList)
//修改
router.post('/update',controls.todoList.index.updateTodoList)
//上传
router.post('/upload',controls.upload.index.uploadTodoList)

router.post('/login',controls.login.index.Login)
module.exports = router