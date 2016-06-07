/**
 * Created by yaoyin on 2016/5/30.
 */

//字符串写入文件
var fs = require('fs');
var path = require('path');

exports.writeFile = function (src,file) {
 fs.writeFile(file,src,function(err){
     if(err){
         throw  err;
     }
 })
};



/*
* 递归方式创建多级文件夹
*
* */
exports.mkdirs = function (dirpath) {
    if (fs.existsSync(dirpath)) {
        return true;
    } else {
        if (arguments.callee(path.dirname(dirpath))) {
            fs.mkdirSync(dirpath);
            return true;
        }
    }
}
