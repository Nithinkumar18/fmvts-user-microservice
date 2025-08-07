const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./src/loggers/logger');
const messageInfo = require('./src/constants/responseInfo');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/v1/user',userRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    
    logger.info(`${messageInfo.SERVICE} connected to database ✅`)

    app.listen(PORT,() => {
        
        logger.info(`${messageInfo.SERVICE} started on PORT ${PORT} 👤`);
    })
}).catch((err) => 
{
    logger.error(`${messageInfo.SERVICE} failed  to connect  database `,err);
})

