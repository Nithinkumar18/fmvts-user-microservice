const express = require("express");
const router = express.Router();
const userController = require('./controller/userController');


router.get('/:email',userController.viewUserProfile);
router.post('/enroll',userController.enrolledUser);
router.put('/:id',userController.updateAcc);
router.delete('/:id',userController.deactivateUser);


module.exports = router;