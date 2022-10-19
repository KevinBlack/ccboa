export default {
    // 格式化时间。 y-年 M-月 d-日 h-小时 m-分 s-秒
    formatDate(date,fmt){
        console.log(/(y+)/.test(fmt))
        if(/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length))
        }
        let o = {
            'M+':date.getMonth()+1,
            'd+':date.getDate(),
            'h+':date.getHours(),
            'm+':date.getMinutes(),
            's+':date.getSeconds()
        };
        for(let k in o){
            if(new RegExp(`(${k})`).test(fmt)){
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)? str: ('00' + str).substr(str.length) );
            }
        }
        return fmt
    },
    // 是str变为长度为2的字符串。不足前边补0，多了截掉前边的
    padLeftZero(str){
        return ('00' + str).substr(str.length)
    }
}