const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();


const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('connected to database-userMicroService ✅');
    app.listen(PORT,() => {
        console.log(`User-MicroService started on the PORT ${PORT} 👤`);
    })
})


