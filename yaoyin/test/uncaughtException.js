////未捕获异常的默认处理

process.on('uncaughtException', function(err) {

	console.log(err.stack);

   try {
       
       var killTimer = setTimeout(function () {
           console.log('定时器执行了')
       }, 3000);

      //killTimer.unref();

   } catch (e) {
       
   }
});


(function a(){
	
	try{
		throw (new Error('不会被 uncaughtException 捕获'))
	}
	catch(e){
		console.log('不会被 uncaughtException 捕获');
	}

	throw ( new Error('会被 uncaughtException捕获'));
})()

