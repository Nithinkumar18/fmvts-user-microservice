const info = {
    SERVICE: "FMAVTS-UserMicroService",
    USER_REGESTRATION_SUCCESS: "User Regestration successfull",
    USER_REGESTRATION_FAIL: "user regestration failed",
    USER_NOT_FOUND: "user not found with given userid",
    USER_UPDATE_SUCCESS: "user profile updation success",
    USER_UPDATE_FAIL: "user profile update failed",
    USER_DEACTIVATION_SUCCESS: "user deactivation success",
    ACCESS_DENIED: "You do not have the required permissions to perform this action; please contact support or an administrator for assistance if you believe this is an error",
    ERR_USER_DATA: "error fetching user data",
    ERROR_VALIDATING_ROLE: "Role validation failed due to issue at server Please try again after some time",
    ROLE_VALIDATION: "user role validation success",
    ROLE_VALIDATION_FAIL: "user role validation failed",
    TOKEN_UNDEFINED: "Authentication token missing or improperly formatted. Please log in and try again.",
    TOKEN_EXPIRED: "Your authentication token has expired or is malformed. Please log in again to continue.",
    QUEUE_CONN_SUCESS: "Queue connection successfull",
    USER_EVENT: "Vehicle assignment details from vehicle service received successfully",
    DRIVER_MSG_QUEUE: "Publish-Vehicle-Details",
    QUEUE_CON_FAIL: "Connection to message-queue Failed",
    QUEUE_CON_CLOSE: "Queue Connection closed",
    VEHICLE_DETAILS_UP_SUCCESS_DRIVER: "Assigned vehicleId has been synced with the driver profile",
    VEHICLE_DETAILS_UP_FAIL_DRIVER: "Unable to sync vehicleId with the driver profile",
    VEHICLE_DATA_UNASSIGN_SUCCESS: "Vehicle Details has been unsynced successfully",
    VEHICLE_DATA_UNASSIGN_FAIL: "Unable to unsync vehicle data with the driver profile",
    DRIVER_AVAILABILITY_STATUS_UP: "Driver availability status has been successfully updated based on the status received from the Trip Service",
    DRIVER_AVAILABILITY_STATUS_UPDATE_FAIL: "Unable to update driver availability status, received from Trip Service"


}
module.exports = info;