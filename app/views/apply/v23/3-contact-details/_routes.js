var express = require('express');
var router = express.Router();

const BASE_PATH = 'apply/v23/3-contact-details';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/apply/v23/3-contact-details';

/*
// What is your address?
router.route('/apply/v23/3-contact-details/address')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['send-letters']) {
    case 'yes~/apply/v23/3-contact-details/telephone':
      redirectUrl = '/apply/v23/3-contact-details/telephone';
      break;
    case 'no~/apply/v23/3-contact-details/correspondence-address':
      redirectUrl = '/apply/v23/3-contact-details/correspondence-address';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});
*/

// Show language preferences when a Welsh postcode is entered 
router.post('/welsh-or-not', function (req, res) {
    var answer = req.session.data['address-postcode'];
    var answer2 = req.session.data['send-letters'];
    if (answer) {
      answer = answer.toUpperCase();
     if (answer.startsWith("LL") || answer.startsWith("SY")|| answer.startsWith("SA") || answer.startsWith("CH") || answer.startsWith("LD") || answer.startsWith("NP") || answer.startsWith("CF")) {
      res.redirect(`/apply/v23/3-contact-details/language-preference-writing`);
    } else if (answer2 === 'no') {
      res.redirect(`/apply/v23/3-contact-details/correspondence-address`);
    }else {
      res.redirect(`/apply/v23/3-contact-details/telephone`);
    }
  } else if (answer2 === 'no') {
      res.redirect(`/apply/v23/3-contact-details/correspondence-address`);
    }else {
      res.redirect(`/apply/v23/3-contact-details/telephone`);
    }
  });

  


// Do you have a mobile number?
router.route('/telephone')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['mobile-phone']) {
    case 'yes~/apply/v23/3-contact-details/email':
      redirectUrl = '/apply/v23/3-contact-details/email';
      break;
    case 'no~/apply/v23/3-contact-details/landline':
      redirectUrl = '/apply/v23/3-contact-details/landline';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Is there another number you can be contacted on?
router.route('/landline')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['other-phone']) {
    case 'yes~/apply/v23/3-contact-details/email':
      redirectUrl = '/apply/v23/3-contact-details/email';
      break;
    case 'no~/apply/v23/3-contact-details/email':
      redirectUrl = '/apply/v23/3-contact-details/email';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

module.exports = router;
