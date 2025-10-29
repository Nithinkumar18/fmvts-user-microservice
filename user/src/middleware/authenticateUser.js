const jwt = require('jsonwebtoken');
const logger = require('../loggers/logger');
const httpCons = require('../constants/httpConstants');
const httpInfo = require('../constants/responseInfo');
require('dotenv').config();

const validateToken = async(req,res,next) => {

    try{
        const auth_token = req.headers.authorization;
        if(!auth_token || !auth_token.startsWith("Bearer")){
            logger.info(`SERVICE: ${httpInfo.SERVICE} | MESSAGE:${httpInfo.TOKEN_UNDEFINED}`);
            return res.status(httpCons.BAD_REQUEST).json({message:info.TOKEN_UNDEFINED});
        }
        const _token = auth_token.split(" ")[1];
        const validtoken = await jwt.verify(_token,process.env.SECRET);
        req.role = validtoken.role;
        next();
    }
    catch(err){
      logger.error(`SERVICE: ${httpInfo.SERVICE} | ERR-MESSAGE:${httpInfo.TOKEN_EXPIRED}`,err);
       return res.status(httpCons.UNAUTHORIZED).json({message:httpInfo.TOKEN_EXPIRED});
    }

}

module.exports = {
    validateToken
}



