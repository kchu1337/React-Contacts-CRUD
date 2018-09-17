'use strict';
const validator = require('validator');

/**
 * Validator that checks that every input is valid
 *
 * @param {Request} req request object
 * @param {Response} res response object
 * @param {Next} next next object
 */
function GeneralValidator(req, res, next) {
  const {email, lname, fname, named, phone, enabled} = req.body;

  if (!validator.isEmail(email) || email.length > 62) {
    res.status(500).send('Invalid Email')
  }
  else if (lname.length > 50) {
    res.status(500).send('Max last name length reached')
  }
  else if (fname.length > 50) {
    res.status(500).send('Max first name length reached')
  }
  else if (typeof enabled !== 'boolean') {
    res.status(500).send('invalid value of enabled')
  }
  else if (!validator.isMobilePhone(phone)) {
    res.status(500).send('invalid phone number')
  }
  else{
    next();
  }
}

module.exports = GeneralValidator;
