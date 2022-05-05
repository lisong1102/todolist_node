/**
 * 定制一个control层用于获取当前controls文件下的所有文件
 * @return tree {object}  返回所有具有层级的tree文件列表
 */
const path = require('path')
const fs = require('fs')
const  mapDir = (d)=>{
    //定义一个对象存放嵌套层级的文件和文件夹
    let tree = {}
    //获取该路径下的所有文件和文件夹
    const fileDir = fs.readdirSync(d)
    //分离文件和文件夹
    let dirs = []
    let files = []
    fileDir.forEach(item=>{
        //如果是文件夹
        if(fs.statSync(path.join(d,item)).isDirectory()){
            dirs.push(item)
        }else{
            files.push(item)
        }
    })
    //文件夹递归继续便利
    dirs.forEach(item=>{
       tree[item] =  mapDir(path.join(d,item))
    })
    //文件便利
    files.forEach(item=>{
        if(path.extname(item)==='.js'){
            //返回路径index.js的最后一部分index
            tree[path.basename(item,'.js')] = require(path.join(d,item))
        }
    })
    return tree
}
module.exports = mapDir(path.join(__dirname))