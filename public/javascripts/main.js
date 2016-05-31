/**
 * Created by yaoyin on 2016/5/26.
 */
var baseurl = 'http://127.0.0.1:3000/javascripts/';
require.config({
    baseUrl: baseurl,
    paths: {
        'ejs': baseurl + 'lib/ejs.min',
        'bootstrap': baseurl + 'lib/bootstrap.min'
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

require(['src/'+type[window.pageType]]);