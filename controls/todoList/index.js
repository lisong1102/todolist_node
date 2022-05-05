const query = require('../../mysql')
const util = require('../../util/util')
//获取todoList数据列表
async function getTodoList(ctx) {
    const { pageSize, pageNo } = ctx.query
    const sql = `select * from note_thing order by addTime desc limit ?,?`;
    const values = [(pageNo - 1) * pageSize, Number(pageSize)]
    console.log(values, 'values')
    const result = await query(sql, values)
    let total = await query('select count(*) as total from note_thing');
    result.forEach(item => {
        //处理一下时间
        item.time = util.getFormatTime(item.time)
        item.addtime = util.getFormatTime(item.addtime)
        item.updatetime = util.getFormatTime(item.updatetime)
        //处理一下路径
        item.imgurl = 'http://localhost:3000/' + item.imgurl
    })
    ctx.body = {
        result,
        total: total[0].total
    }

}
//添加数据
async function addTodoList(ctx) {
    let params = ctx.request.body
    params.addtime = new Date()
    params.id = new Date().getTime()
    const sql = 'insert into note_thing set ?'
    let result = await query(sql, params)
    if (result) {
        let json = {
            code: '200',
            success: true,
            msg: '新增成功'
        }
        ctx.body = json
    } else {
        ctx.body = {
            success: false,
            msg: '新增失败'
        }
    }
}

//批量删除数据
async function deleteTodoList(ctx) {
    let { ids } = ctx.query
    let values = ids.split(',')
    const sql = 'delete  from note_thing where id in (?)'
    let result = await query(sql, values)
    if (result) {
        ctx.body = {
            success: true,
            msg: '删除成功'
        }
    } else {
        ctx.body = {
            success: false,
            msg: '删除失败'
        }
    }

}

//修改数据
async function updateTodoList(ctx) {
    let params = ctx.request.body
    params.updatetime = new Date()
    let sql = 'update note_thing set ? where id=?'
    let values = [params, params.id]
    let result = await query(sql, values)
    if (result) {
        ctx.body = {
            success: true,
            msg: '修改成功'
        }
    } else {
        ctx.body = {
            success: true,
            msg: '修改失败'
        }
    }

}

module.exports = {
    getTodoList,
    addTodoList,
    deleteTodoList,
    updateTodoList
}