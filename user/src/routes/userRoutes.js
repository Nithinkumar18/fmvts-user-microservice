const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');
const {authorizeRole} = require('../middleware/authorizeUserRole');
const {validateToken} = require('../middleware/authenticateUser');


router.get('/:email',userController.viewUserProfile);
router.post('/enroll',userController.enrollUser);
router.put('/:id',validateToken,userController.updateAcc);
router.delete('/:id',validateToken,authorizeRole(["admin"]),userController.deactivateUser);


module.exports = router;