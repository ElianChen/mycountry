/**
 * Created by yaoyin on 2016/5/26.
 */
var baseurl = 'http://127.0.0.1:3000/javascripts/';

if (window.jQuery) {
    define('jquery', [], function() {
        return jQuery;
    });
} else {
    require.config({
        paths: {
            jquery: 'lib/jquery.min'
        }
    });
}

require.config({
    baseUrl: baseurl,
    paths: {
        'ejs': baseurl + 'lib/ejs.min',
        'bootstrap': baseurl + 'lib/bootstrap.min',
        'scriptalizer': 'lib/scriptalizer.min',
        'echarts': baseurl + 'lib/echarts.min'
    },
    shim: {
        'bootstrap':{
            deps:['jquery'],
            exports: 'bootstrap'
        },
        'scriptalizer':{
            deps:['jquery'],
            exports: 'scriptalizer'
        }
    }
});


var type = {
    login:'login',
    register:'register',
    channel:'channel/list',
    '404':'404'
};

var pageType = window.pageType;

if(typeof pageType !== 'undefined' ){
    require(['src/'+type[pageType]]);
}
