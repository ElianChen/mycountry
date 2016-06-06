/**
 * Created by yaoyin on 2016/6/6.
 */
'use strict';

var ejs = require('ejs');
var tmpl = require('fs').readFileSync(__dirname + '/index.ejs', 'utf8');

exports.render = function (data, options) {
    return ejs.compile(tmpl, options)(data);
};