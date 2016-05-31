/**
 * Created by yaoyin on 2016/5/31.
 */
define(['jquery','ejs'], function ($,EJS) {

    var people = ['geddy', 'neil', 'alex'],
        html = ejs.render(
            $('#destDialogTmpl').html() ,
            {people: people},
            {delimiter: '$'}
        );

    $('body').append(html);

});