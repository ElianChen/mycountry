/**
 * Created by yaoyin on 2016/6/6.
 */

/*
* 当某个页面的输入数据变化，模板不变且被用嵌入在多个页面时使用
* */
var cacheWidget = {};

module.exports = function(widgetName, cacheFlag){

    if(!widgetName || typeof widgetName !== 'string'){
        console.error('组件名错误！');
        return false;
    }

    if(cacheWidget[widgetName] && cacheFlag){
        return cacheWidget[widgetName];
    }

    var widget = require('../views/widget/' + widgetName + '/index');

    if(!widget){
        console.error('无组件！');
        return false;
    }

    cacheWidget[widgetName] = widget;

    return widget;
};
