const query = require('../../mysql')

const uploadFile = require('../../util/upload')

async function uploadTodoList(ctx) {
    let id = ctx.query.id
    let req = ctx.req //获取原生的req
    //上传文件
    const result = await uploadFile(req, 'upload')
    //将上传得文件存入数据库
    let body = {
        success: true,
        msg: '文件存入数据库成功'
    }
    result.data.forEach(async (item) => {
        let sql = 'update note_thing set imgurl=? where id=?'
        let values = [item.filename, id]
        let res = await query(sql, values)
        if (res) {
            console.log('文件存入数据库成功')
        } else {
           body.success= false
           body.msg = '文件存入数据库失败'
        }
    })
    ctx.body = body
}

module.exports = {
    uploadTodoList
}