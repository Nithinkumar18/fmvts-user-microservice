const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true
    },
    role:{
        type:String,
        required: true,
        enum: ["admin","driver","fleet_manager"]
    },
    licenseNumber:{
        type: String,
        required: function () {
            return this.role == "driver"
        }
    },
    availabilityStatus:{
        type: String,
        enum: ["active", "on_leave","busy"],
        default: "active"
    },
    assignedVehicleId:{
        type: String,

    }
},{timestamps: true});

module.exports = mongoose.model("User",userSchema);