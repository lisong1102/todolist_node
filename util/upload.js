const { createPathDir, getStaticUploadPath } = require('./uploadTool')
const fs = require('fs')
const path = require('path')
const Busboy = require('busboy')

function uploadFile(req, uploadDir) {
    return new Promise((resolve, reject) => {
        //创建上传文件存放的路径
        let createPath = path.join(getStaticUploadPath(), uploadDir)
        //创建文件
        createPathDir(createPath)
        //解析文件
        let busboy = new Busboy({ headers: req.headers })

        let result = {
            success: true,
            msg: '上传成功',
            data:[]
        }
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

            //创建上传文件名
            let fileName = Math.random().toString(16) + '.' + filename.split('.')[1]
            //写入文件的路径
            let fileWritePath = path.join(createPath, fileName)
            //创建可写流
            let createSream = fs.createWriteStream(fileWritePath)
            //创建通道写入文件
            file.pipe(createSream)

            file.on('end', function () {
                console.log('上传文件成功....')
                let obj ={file,filename:fileName}
                result.data.push(obj)
            });
        })
        // 解析结束事件
        busboy.on('finish', function () {
            console.log('文件上传成功')
            resolve(result)
        })
        busboy.on('error', function () {
            console.log('文件上传失败')
            result.success = false
            result.msg = '上传失败'
            result.data=[]
            reject(result)
        })
        req.pipe(busboy)
    })

}

module.exports = uploadFile