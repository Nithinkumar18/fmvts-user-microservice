const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');
const {authorizeRole} = require('../middleware/authorizeUserRole');


router.get('/:email',userController.viewUserProfile);
router.post('/enroll',userController.enrollUser);
router.put('/:id',userController.updateAcc);
router.delete('/:id',authorizeRole(["admin"]),userController.deactivateUser);


module.exports = router;