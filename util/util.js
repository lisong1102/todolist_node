function getFormatTime(time) {
    let myTime = time
    if (myTime) {
        let year = myTime.getFullYear();
        let month = myTime.getMonth() + 1 < 10 ? '0' + (myTime.getMonth() + 1) : myTime.getMonth() + 1
        let day = myTime.getDate() < 10 ? '0' + myTime.getDate() : myTime.getDate()
        let hh = myTime.getHours()<10?'0'+ myTime.getHours(): myTime.getHours()
        let ss = myTime.getMinutes()<10?'0'+myTime.getMinutes():myTime.getMinutes()
        let mm =myTime.getSeconds()<10?'0'+myTime.getSeconds():myTime.getSeconds()
        return year + '-' + month + '-' + day + ' '+hh+':'+ss+':'+mm
    }


}

module.exports = {
    getFormatTime
}