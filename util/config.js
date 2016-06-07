/**
 * Created by yaoyin on 2016/5/31.
 */
var mongoose = require('mongoose');

global.dbHandel = require('../database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");
global.checkcodeEnable = false; //是否启用验证码

module.exports = {
    log4js: {
        appenders: [{
            "type": "dateFile",
            "filename": "web.log",
            "category": "web",
            "pattern": ".yyyy-MM-dd",
            "alwaysIncludePattern": false,
            "level": "DEBUG",
            "layout": {
                "type": "pattern",
                "pattern": "%d [%x{pid}] %p %m%n",   //时间戳 [进程编号] 日志等级 具体内容
                "tokens": {
                    "pid": function () {
                        return process.pid;
                    }
                }
            }
        }]
    }
}

