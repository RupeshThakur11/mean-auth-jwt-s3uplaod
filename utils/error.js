var express = require('express')
  , router = express.Router();

exports.parseErrorreturnErrorMessage = function(err) {
    var errorMessage = "";
      if(err.errmsg){
        errorMessage = err.errmsg;
      }else if(err.message){
        errorMessage = err.message;
      }
	return errorMessage;
}