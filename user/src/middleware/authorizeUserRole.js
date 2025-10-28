const logger = require('../loggers/logger');
const resMsg = require('../constants/responseInfo');
const httpCons = require('../constants/httpConstants');

const authorizeRole = (allowedRoles) => {

    return (req,res,next) => {
        try{
        const _role = req.role;
        const validRole = allowedRoles.includes(_role);
        if(validRole){
            logger.info(`SERVICE: ${resMsg.SERVICE} || MESSAGE: ${resMsg.ROLE_VALIDATION}`);
            next();
        }
        else{
            logger.info(`SERVICE: ${resMsg.SERVICE} || MESSAGE: ${resMsg.ACCESS_DENIED}`);
            return res.status(httpCons.UNAUTHORIZED).json({message:resMsg.ACCESS_DENIED});
        }
    }
    catch(err){
        return res.status(httpCons.INTERNAL_SERVER_ERROR).json({message:resMsg.ERROR_VALIDATING_ROLE,Error:err.message});
    }
    }

}

module.exports = {authorizeRole};