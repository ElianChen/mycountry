/**
 * Created by yaoyin on 2016/5/26.
 */
var baseurl = 'http://127.0.0.1:3000/javascripts/';
require.config({
    baseUrl: baseurl,
    paths: {
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

switch (window.pageType) {
    case 'login':
        require(['src/login']);
        break;
    case 'register':
        require(['src/register']);
        break;
    default:
        require(['']);
        break;
}