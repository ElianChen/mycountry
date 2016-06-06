/**
 * Created by yaoyin on 2016/5/31.
 */
var mongoose = require('mongoose');
module.exports = function(){
    global.dbHandel = require('../database/dbHandel');
    global.db = mongoose.connect("mongodb://localhost:27017/nodedb");
    global.checkcodeEnable = false; //是否启用验证码
};
