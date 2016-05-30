var express = require('express');
var router = express.Router();
var page = require('../middleware/page');



/* GET users listing. */
router.get('/', function(req, res, next) {


  var UserModel = global.dbHandel.getModel('user');
  var query = UserModel.find({});
  //query.select('name');//filter field
  query.exec(function(err,infos){
    if(err){

      res.send(500);
    }else{
      res.render('users',{title:'用户组',users:infos});
    }

  });
});

module.exports = router;
