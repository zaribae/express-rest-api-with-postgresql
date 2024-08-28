const { register } = require('../controller/AuthController.js');

const router = require('express').Router();

router.route('/register').post(register);

module.exports = router;

