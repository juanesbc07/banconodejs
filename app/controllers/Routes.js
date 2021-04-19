const express = require('express');
const CustomerController = require('../controllers/CustomerController')
const AccountController = require('../controllers/AccountController')

const router = express.Router();

router.post('/customers',CustomerController.create);
router.get('/customers/:id',CustomerController.findCustomer);
router.get('/customers/',CustomerController.findAllCustomers);
///////////////////////////////////////////////////////////
router.delete('/accounts/:id',AccountController.delete);
router.put('/accounts/withdraw',AccountController.retirar);
router.put('/accounts/consignment',AccountController.consignar);
router.put('/accounts/consignment',AccountController.consignar);
router.put('/accounts/transfer',AccountController.transferir);


/////////////////////////////////////////////////////////////
router.delete('/customers/:id',CustomerController.delete);
router.put('/customers/:id',CustomerController.edit);
router.get('/customers/:id/accounts', AccountController.listAccountsByCustomer);
router.post('/accounts',AccountController.createAccount);

module.exports=router;