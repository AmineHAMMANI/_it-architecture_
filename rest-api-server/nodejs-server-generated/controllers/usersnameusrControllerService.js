'use strict'

module.exports.funcusersnameusrGET = function funcusersnameusrGET(req, res, next) {
  console.log(req);
  res.send({
    message:req.name_usr.value +"hello world "
  });
};