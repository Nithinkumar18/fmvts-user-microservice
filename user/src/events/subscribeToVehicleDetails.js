const amqp = require('amqplib');
require('dotenv').config();
const logger = require('../loggers/logger');
const rInfo = require('../constants/responseInfo');
const userService = require('../service/userService');
const consumeVehicleAssignmentInfo = async () => {

  try {
    let receivedVehicleInfo;
    const connection = await amqp.connect(process.env.MESSAGE_QUEUE_URL);
    const channel = await connection.createChannel();
    logger.info(`SERVICE - ${rInfo.SERVICE} - ${process.env.QUEUE} : ${rInfo.QUEUE_CONN_SUCESS}`);
    await channel.assertQueue(process.env.QUEUE, { durable: true });
    channel.prefetch(1);
    channel.consume(process.env.QUEUE, async (data) => {
      if (!data) return;
      receivedVehicleInfo = JSON.parse(data.content.toString());
      logger.info(`SERVICE - ${process.env.QUEUE} : ${rInfo.USER_EVENT}`);

      if (receivedVehicleInfo.assignedVehicleId === "") {
        const updateDriverAssigneDetails = await userService.unassignvehicleDetails(receivedVehicleInfo.user_id, { assignedVehicleId: receivedVehicleInfo.assignedVehicleId });
        if (updateDriverAssigneDetails) {
          logger.info(`SERVICE - ${rInfo.SERVICE} - ${process.env.QUEUE} : ${rInfo.VEHICLE_DETAILS_UP_SUCCESS_DRIVER}`);

        }
        else {
          logger.error(`SERVICE -  ${rInfo.SERVICE} - ${process.env.QUEUE} : ${rInfo.VEHICLE_DETAILS_UP_FAIL_DRIVER}`)
        }
      }
      else {
        const updateDriverAssigneDetails = await userService.updateUser(receivedVehicleInfo.user_id, { assignedVehicleId: receivedVehicleInfo.assignedVehicleId });
        if (updateDriverAssigneDetails) {
          logger.info(`SERVICE - ${rInfo.SERVICE} - ${process.env.QUEUE} : ${rInfo.VEHICLE_DATA_UNASSIGN_SUCCESS}`);

        }
        else {
          logger.error(`SERVICE -  ${rInfo.SERVICE} - ${process.env.QUEUE} : ${rInfo.VEHICLE_DATA_UNASSIGN_FAIL}`)
        }
      }
      channel.ack(data);
    },
      { noAck: false }
    )
  }
  catch (error) {
    const code = error.errors?.[0]?.code || error.code || 'UNKNOWN_ERROR';
    logger.error(`SERVICE -  ${rInfo.SERVICE} - ${process.env.QUEUE} || ${code}`);
  }


}
module.exports = {
  consumeVehicleAssignmentInfo
}
