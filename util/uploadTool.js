const fs = require('fs')
const path = require('path')

/**
 * 判断文件夹是否存在，如果不存在就创建该文件夹
 * @param {*} mFilePath 创建文件夹的名字
 * @returns  无
 */
function createPathDir (mFilePath){
    if(fs.existsSync(mFilePath)){
        return true
    }
    if(createPathDir(path.dirname(mFilePath))){//判断路径下的上一级文件是否存在
        fs.mkdirSync(mFilePath)
    }
}
function getStaticUploadPath(){
  return  path.join(path.dirname(__dirname),'static')
}

module.exports = {
    createPathDir,
    getStaticUploadPath
}


