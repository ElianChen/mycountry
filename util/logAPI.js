var log4js = require('log4js');
var config = require('./config');
var fs = require('fs');
var tool = require('./tool');

//日志系统地址前缀
var logOrigUrl = process.cwd() + "/logs/";

//配置
if (config.log4js && config.log4js.appenders) {
    config.log4js.appenders.forEach(function (appender) {
        if (appender.filename) {
            //log地址修正
            appender.filename = logOrigUrl + appender.filename;
            try {
                tool.mkdirs(logOrigUrl);
            } catch (e) {
                console.log("No logs directory --" + logOrigUrl + "!");
            }
        }
    });
}


try {
    //初始化log4js
    log4js.configure(config.log4js);
    //web log
    module.exports.webLog = getLogger('web');

} catch (e) {
    console.log("config.log4js error");
    return;
}

//app use
module.exports.use = function(app, log) {

    app.use(function(req, res, next) {

        var start = new Date();

        res.on('finish', function() {

            res.responseTime = new Date() - start;
            try {
                var c = ':ip :method :url :statusCode *responseTimeFN*=:responseTime *params*=:params *session*=:session *headers*=:headers'.split(' ').join(' \r\n ');
                var str = format(req, res, c);
                log(str, 'info');
            } catch (e) {
                console.log(req.url + " log error!");
            }
        });

        next();

    });
};

/*
* debug
* info
* warn
* error
* fatal*/
function getLogger(logName) {
    var oriLog = log4js.getLogger(logName);
    return function(msg,type) {
            return oriLog[type](msg);
        }
}

function format(req, res, str) {
    str = str.replace(/:ip/, (req.headers['x-forwarded-for'] || req.ip || req._remoteAddress || (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress))) || req.headers['tn_realip']).replace("::ffff:", ""));
    str = str.replace(/:method/, req.method);
    str = str.replace(/:url/, req.originalUrl);
    str = str.replace(/:statusCode/, res.statusCode);
    str = str.replace(/:responseTime/, res.responseTime + "ms");
    str = str.replace(/:params/, req.method == "GET" ? JSON.stringify(req.query) : JSON.stringify(req.body));
    str = str.replace(/:session/, JSON.stringify(req.session));
    str = str.replace(/:headers/, JSON.stringify(req.headers));
    return str;
}