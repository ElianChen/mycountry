/**
 * Created by yaoyin on 2016/5/30.
 */

//字符串写入文件
var fs = require('fs');
exports.writeFile = function (src,file) {
 fs.writeFile(file,src,function(err){
     if(err){
         throw  err;
     }
 })
};
