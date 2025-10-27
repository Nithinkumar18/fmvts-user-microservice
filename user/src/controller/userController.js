const userService = require('../service/userService');
const   responseInfo = require('../constants/responseInfo');
const httpCodes = require('../constants/httpConstants');
const logger = require('../loggers/logger');

const enrollUser = async(req,res) => {
    try{
        
         const userData = req.body;
         logger.info(`SERVICE - ${responseInfo.SERVICE} : ${req.path}`);
         const enrolledUser = await userService.registerUser(userData);
         if(enrolledUser.user_id){
            logger.info(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.USER_REGESTRATION_SUCCESS}`)
            return res.status(httpCodes.CREATED).json({message: responseInfo.USER_REGESTRATION_SUCCESS,Id:enrolledUser.user_id});
         }
    }
    catch(err){
           return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}


const updateAcc = async(req,res) => {
    try{
          const _id = req.params.id
         const _info = req.body
         logger.info(`SERVICE - ${responseInfo.SERVICE} : ${req.URL}`);
         const infoToBeUpdated = await userService.updateUser(_id,_info);
         if(infoToBeUpdated.userId && infoToBeUpdated.updatedAt){
            logger.info(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.USER_UPDATE_SUCCESS}`);
            logger.info(infoToBeUpdated.userId,infoToBeUpdated.updatedAt);
            return res.status(httpCodes.SUCCESS).json({message:responseInfo.USER_UPDATE_SUCCESS, userId:infoToBeUpdated.userId, updatedAt:infoToBeUpdated.updatedAt});
         }
    }
    catch(err){
       return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}


const deactivateUser = async(req,res) => {
    try{
         const user_id = req.params.id;
         logger.info(`SERVICE - ${responseInfo.SERVICE} : ${req.URL}`);
         const deactivationSuccess = await userService.deleteUser(user_id);
         if(deactivationSuccess.userId){
             logger.info(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.USER_DEACTIVATION_SUCCESS}`);
             logger.info(`SERVICE - ${responseInfo.SERVICE} : userId- ${deactivationSuccess.userId} : deactivatedAt - ${deactivationSuccess.updatedAt}`);
             return res.status(httpCodes.SUCCESS).json({message:responseInfo.USER_DEACTIVATION_SUCCESS,userId:deactivationSuccess.userId,deactivatedAt:deactivationSuccess.updatedAt})
         }
    }
    catch(err){
          logger.error(`SERVICE - ${responseInfo.SERVICE} : User with ${user_id} ${responseInfo.USER_NOT_FOUND}`)
          return res.status(httpCodes.NOT_FOUND).json(err);
    }
}

const viewUserProfile = async(req,res) => {
    try{
      const email = req.params.email;
      logger.info(`SERVICE - ${responseInfo.SERVICE} : ${req.URL}`);
      const userDetails = await userService.userProfile(email);
      return res.status(httpCodes.SUCCESS).json({userDetails});
    }
    catch(err){
        logger.error(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.ERR_USER_DATA}`)
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({message:responseInfo.ERR_USER_DATA});
    }
    
}

module.exports = {

    enrollUser,
    updateAcc,
    deactivateUser,
    viewUserProfile

}