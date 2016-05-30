/**
 * Created by yaoyin on 2016/5/26.
 */
var async = require('async');
// two先执行结束。因为是array形式，所以results的顺序“强制”跟array一致。
async.parallel([
        function(callback){
            setTimeout(function(){
                console.log('one1');
                callback(null, 'one');
                console.log('one2');
            }, 3000);
        },
        function(callback){
            setTimeout(function(){
                console.log('two1');
                callback(null, 'two');
                console.log('two2');
            }, 100);
        }
    ],
// optional callback
    function(err, results){
        // the results array will equal ['one','two'] even though
        // the second function had a shorter timeout.
        console.log(results);
    });



// an example using an object instead of an array
// two先执行结束。因为是object形式，有key去区分，所以results的顺序不强制跟object一致。
async.parallel(
{
     one:function(callback){
        setTimeout(function(){
            console.log('one1');
            callback(null, 1);
            console.log('one2');
        }, 2000);
    },
     two:function(callback){
        setTimeout(function(){
            console.log('two1');
            callback(null, 2);
            console.log('two2');
        }, 100);
    }
},
    function(err, results) {
    // results is now equals to: {one: 1, two: 2}
        console.log(results);
    }
);