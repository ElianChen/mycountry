/**
 * Created by yaoyin on 2016/5/31.
 */
'use strict';

var request = require('request');

var tool = require('../../util/tool');

exports.actionList = function(req,res,next){

    //console.log(req.originalUrl);
    //console.log(req.baseUrl);
    //console.log(req.pathname);

    request(
        {
            url:'http://flight.api.tuniu.com/query/queryCheapTickets',
            method:'get',
            headers:{}
        },
        function (error, response, body) {

            //tool.writeFile(JSON.stringify(response),'response.txt');
            //tool.writeFile(body,'body.txt');

            if(!error && 200 == response.statusCode){
                res.render(
                    'channel/list',
                    JSON.parse(body)
                );
            }else{
                res.redirect('/');
            }
        }
    );



};


