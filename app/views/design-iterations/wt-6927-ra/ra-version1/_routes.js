var express = require('express');
var router = express.Router();

const BASE_PATH = 'design-iterations/wt-6927-ra/ra-version1';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/design-iterations/wt-6927-ra/ra-version1';

// Who is applying?
router.post('/before/who-is-applying', function (req, res) {
  var answer = req.session.data['apply'];
  if (answer === 'apply-someone') {
    res.redirect(`${ABS_BASE_PATH}/before/cannot-apply-online`);
  } else if (answer === 'apply-help') {
    res.redirect(`${ABS_BASE_PATH}/before/helping-someone-apply`);
  }else {
    res.redirect(`${ABS_BASE_PATH}/before/eligibility-start`);
  }
});

// Do you have a disability or health condition that affects how much you can work?
router.post('/before/disability-or-health-condition', function (req, res) {
  var answer = req.session.data['disabilityOrHealthCondition']; 

  if (answer === 'disability-no') {
    res.redirect(`${ABS_BASE_PATH}/before/may-not-be-eligible`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/before/state-pension`);
  }
});

// Not eligible - What do you want to do?
router.post('/before/may-not-be-eligible', function (req, res) {
  var answer = req.session.data['whatDoYouWantToDo'];
  if (answer === 'apply-uc') {
    res.redirect('https://www.gov.uk/universal-credit');
  } else if (answer === 'apply-nsjsa') {
    res.redirect('https://www.gov.uk/jobseekers-allowance');
  }else {
    res.redirect(`${ABS_BASE_PATH}/before/state-pension`);
  }
});

// Are you under State Pension age?
router.post('/before/state-pension', function (req, res) {
  var answer = req.session.data['state-pension']; 

  if (answer === 'no-over') {
    res.redirect(`${ABS_BASE_PATH}/before/may-not-be-eligible-state-pension`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/before/national-insurance`);
  }
});

// Have you been employed and paid National Insurance over the last 2 to 3 years?
router.post('/before/national-insurance', function (req, res) {
  var answer = req.session.data['ni-cons']; 

  if (answer === 'no-not-paid') {
    res.redirect(`${ABS_BASE_PATH}/before/may-not-be-eligible-national-insurance`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/before/statutory-pay`);
  }
});

// Not eligible National Insurance - What do you want to do?
router.post('/before/may-not-be-eligible-national-insurance', function (req, res) {
  var answer = req.session.data['whatDoYouWantToDo'];
  if (answer === 'apply-uc') {
    res.redirect('https://www.gov.uk/universal-credit');
  } else {
    res.redirect(`${ABS_BASE_PATH}/before/statutory-pay`);
  }
});

// Are you getting Statutory Sick Pay?
router.post('/before/statutory-pay', function (req, res) {
  var answer = req.session.data['statutory-pay'];
  if (answer === 'yes-statutory-pay') {
    res.redirect(`${ABS_BASE_PATH}/before/statutory-pay-date`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/before/why-no-ssp`);
  }
});

// Does your Statutory Sick Pay end in the next 3 months?
router.post('/before/statutory-pay-date', function (req, res) {
  var answer = req.session.data['statutory-pay-date'];
  if (answer === 'no-statutory-pay-date') {
    res.redirect(`${ABS_BASE_PATH}/before/may-not-be-eligible-statutory-pay`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/before/may-be-eligible`);
  }
});

// What is your address? // Can we send letters about your claim to this address?
router.post('/before/postal-address', function (req, res) {
  var answer = req.session.data['send-letters'];
  if (answer === 'no-letters') {
    res.redirect(`${ABS_BASE_PATH}/before/correspondence-address`);
  } else if (answer ==='yes-letters'){
    res.redirect(`${ABS_BASE_PATH}/before/telephone`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/before/postal-address`);
  }
});

// Do you have a mobile number?
router.post('/before/telephone', function (req, res) {
  var answer = req.session.data['mobile-phone'];
  if (answer === 'no-mobile') {
    res.redirect(`${ABS_BASE_PATH}/before/landline`);
  } else if (answer ==='yes-mobile') {
    res.redirect(`${ABS_BASE_PATH}/before/email`);
  }  else {
      res.redirect(`${ABS_BASE_PATH}/before/telephone`);
    
  }
});

// Do you need an alternative format?
router.post('/guard', function (req, res) {
  const answer = req.body.altFormatNeeds;

  if (answer === 'yes-alt-formats') {
    res.redirect(`${ABS_BASE_PATH}/phone-contact-preference`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/reasonable-adjustment`);
  }
});


// What do you need instead of a phone call?
router.post('/phone-contact-preference', function (req, res) {
  const answer = req.body.phoneContactPreference;

  if (answer === 'relay-uk') {
    res.redirect(`${ABS_BASE_PATH}/contact-phone-af-relay`);
  } else if (answer === 'textphone') {
    res.redirect(`${ABS_BASE_PATH}/contact-phone-af-textphone`);
  } else if (answer === 'email-af-phone') {
    res.redirect(`${ABS_BASE_PATH}/letters-contact-preference`);
  }else {
    res.redirect(`${ABS_BASE_PATH}/letters-contact-preference`);
  }
});


// What do you need instead of a standard letter?
router.post('/letters-contact-preference', function (req, res) {
  let data = req.session.data;
  let answer;

  if (data['lettersContactPreference']) {
    answer = data['lettersContactPreference'];
  } else {
    answer = [];
  };

  answer = [].concat(answer);
  console.log(answer, typeof answer);

  if (answer.includes('audio')) {
    res.redirect(`${ABS_BASE_PATH}/audio`);
  } else if (answer.includes('braille')) {
    res.redirect(`${ABS_BASE_PATH}/braille`);
  } else if (answer.includes('coloured-paper')) {
    res.redirect(`${ABS_BASE_PATH}/coloured-paper`);
  } else if (answer.includes('coloured-paper-large-print')) {
    res.redirect(`${ABS_BASE_PATH}/coloured-paper`);
  } else if (answer.includes('email-af')) {
    res.redirect(`${ABS_BASE_PATH}/reasonable-adjustment?checkanswers`);
  } else if (answer.includes('large-print')) {
    res.redirect(`${ABS_BASE_PATH}/large-print`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/reasonable-adjustment?checkanswers`);
  }

});

// Reasonable adjustments : Do you have any other accessibility needs?
router.post('/reasonable-adjustment-options', function (req, res) {
  const answer = req.body.adjustments;

  if (answer === 'yes') {
    res.redirect(`${ABS_BASE_PATH}/reasonable-adjustment-options`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/after/condition`);
  }
});




module.exports = router;
