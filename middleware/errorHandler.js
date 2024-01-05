const {constants}=require("../constants"); 

const errorHandler =(err,req,res,next) => {
 const statusCode = res.statusCode ? res.statusCode : 500 ;
 switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({title:"Validation failed",message: err.message, stackTrace: err.stack});
        break;
    case constants.NOT_FOUND:
        res.json({title:"Not found",message: err.message, stackTrace: err.stack});
        break;
    case constants.UNAUTHORIZED:
        res.json({title:"unauthorized",message: err.message, stackTrace: err.stack});
        break;
    case constants.FORBIDOEN:
        res.json({title:"forbidoen",message: err.message, stackTrace: err.stack});
        break;
    case constants.SERVER_ERROR:
        res.json({title:"server_error",message: err.message, stackTrace: err.stack});
    default:
        console.log("no Error, all OK ");
        break;
 } 
};
 
module.exports = errorHandler;