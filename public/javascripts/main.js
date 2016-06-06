/**
 * Created by yaoyin on 2016/5/26.
 */
var baseurl = 'http://127.0.0.1:3000/javascripts/';
require.config({
    baseUrl: baseurl,
    paths: {
        'ejs': baseurl + 'lib/ejs.min',
        'bootstrap': baseurl + 'lib/bootstrap.min',
        'echarts': baseurl + 'lib/echarts.min'
    },
    shim: {
        'bootstrap':{
            deps:['jquery'],
            exports: 'bootstrap'
        }
    }
});
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

var type = {
    login:'login',
    register:'register',
    channel:'channel/list'
};

var pageType = window.pageType;

if(typeof pageType !== 'undefined' ){
    require(['src/'+type[pageType]]);
}
