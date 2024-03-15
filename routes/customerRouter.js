const express = require("express");


const router = express.Router();

const customerController = require("../Controller/customerController")

router.route('/').get(customerController.lengthData).post(customerController.newData);
router.route('/:id')
.get(customerController.getCustomerById)
.patch(customerController.updateData)
.delete(customerController.deleteData);

module.exports = router;