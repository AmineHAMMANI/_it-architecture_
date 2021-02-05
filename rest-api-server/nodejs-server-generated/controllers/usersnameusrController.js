'use strict'

var varusersnameusrController = require('./usersnameusrControllerService');

module.exports.funcusersnameusrGET = function funcusersnameusrGET(req, res, next) {
  varusersnameusrController.funcusersnameusrGET(req.swagger.params, res, next);
};