/**
 * Created by yaoyin on 2016/5/26.
 */
require(['bootstrap']);

define(['jquery'],function($){
    /*$('#CheckCode')
     .prop('src','verification/image?t='+Math.random())
     .on('click',function(e){
     $(this).prop('src', 'verification/image?t='+Math.random());
     });*/

    $("#register0").click(function(){
        location.href = 'register';
    });
    $("#login0").click(function(){

        var username = $("#username").val();
        var password = $("#password").val();
        var checkcode = $('#CheckcodeInput').val();

        var data = {
            'uname':username,
            'upwd':password,
            'checkcode':checkcode
        };

        $.ajax({
            url:'/login',
            type:'post',
            data: data,
            success: function(){
                location.href = 'home';
            },
            error: function(){
                //location.href = 'login';
            }
        });
    });
});