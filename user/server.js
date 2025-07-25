const express = require('express');
const mongoose = require('mongoose');
const logger = require('./src/loggers/logger');
const messageInfo = require('./src/constants/responseInfo');
const app = express();
require('dotenv').config();


const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    // console.log('connected to database-userMicroService ✅');
    logger.info(`${messageInfo.SERVICE} connected to database ✅`)

    app.listen(PORT,() => {
        console.log(`${messageInfo.SERVICE} started on the PORT ${PORT} 👤`);
    })
})


