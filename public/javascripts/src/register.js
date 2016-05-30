/**
 * Created by yaoyin on 2016/5/26.
 */
define(['jquery'],function($){

    $("#login1").click(function(){
        location.href = 'login';
    });
    $("#register1").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var password1 = $("#password1").val();
        if(password !== password1){
            $("#password").css("border","1px solid red");
            $("#password1").css("border","1px solid red");
        }else if(password === password1){

            var data = {"uname":username,"upwd":password};
            $.ajax({
                url: '/register',
                type: 'post',
                data: data,
                success: function(){
                    location.href = 'login';
                },
                error: function(){
                    location.href = 'register';
                }
            });
        }
    });

});