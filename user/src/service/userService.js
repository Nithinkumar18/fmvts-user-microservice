const bcrypt = require('bcrypt');
const user = require('../model/user');
const logger = require('../loggers/logger');
const responseInfo = require('../constants/responseInfo');
require("dotenv").config();


const registerUser = async (_user) => {

    try {
         const preEncrypted = _user.password;
         const encryptedPass = hashPassword(preEncrypted);
         _user.password = encryptedPass;
        const _newUser = await user.create(_user);

        logger.info(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.USER_REGESTRATION_SUCCESS}`);
        logger.info(`Created User Info ${_newUser._id}: created At: ${_newUser.createdAt}`);
        return {
            user_id: _newUser._id,
        }
    }
    catch (err) {
        logger.error(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.USER_REGESTRATION_FAIL}`);
        throw new Error(responseInfo.USER_REGESTRATION_FAIL);
    }

}

const updateUser = async (user_id, updateInfo) => {
    try {
        const updatedUserData = await user.findByIdAndUpdate({ '_id': user_id }, { $set: updateInfo });
        const { updatedAt, _id } = updatedUserData;
        logger.info(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.USER_UPDATE_SUCCESS}`);
        logger.info(`USER ${_id} INFO updated at ${updatedAt}`);
        return {
            userId: _id,
            updatedAt: updatedAt
        }
    }
    catch (err) {
        logger.error(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.USER_UPDATE_FAIL}`);
        throw new Error(responseInfo.USER_UPDATE_FAIL);
    }
}


const deleteUser = async (id) => {
    try {

        const user_rm = await user.findByIdAndDelete(id);
        if (user_rm) {
            logger.info(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.USER_DEACTIVATION_SUCCESS}`);
            logger.info(`User With Id ${user_rm._id} Deactivated`);
            return {
                userId: user_rm._id,
                updatedAt:user_rm.updatedAt
            }
        }
    }
    catch (err) {
        logger.error(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.USER_NOT_FOUND}`);
        throw new Error(responseInfo.USER_NOT_FOUND);
    }
}


const hashPassword = (pwd) => {
    const hashRounds = parseInt(process.env.hashRounds,10);
    const encryptedPassword = bcrypt.hashSync(pwd,hashRounds);
    return encryptedPassword;

}

const userProfile = async(uemail) => {

    try{
       const validUser = await user.findOne({email:uemail});
       logger.info(`SERVICE - ${responseInfo.SERVICE} `);
        return validUser;
    }
    catch(err){
        logger.error(`SERVICE - ${responseInfo.SERVICE} : ${responseInfo.ERR_USER_DATA}`);
       throw new Error(responseInfo.ERR_USER_DATA);
    }

}
module.exports = {
    registerUser,
    updateUser,
    deleteUser,
    userProfile
}