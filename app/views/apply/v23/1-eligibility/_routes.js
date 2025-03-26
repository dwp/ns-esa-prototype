var express = require('express');
var router = express.Router();

const BASE_PATH = 'apply/v23/1-eligibility';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/apply/v23/2-personal-details';

//Who is applying?
router.route('/who-is-applying')
.post((req, res, next) => {
  req.session.destroy();
  let redirectUrl;
  switch (req.body['apply']) {
    case 'apply-myself':
      redirectUrl = '/apply/v23/1-eligibility/eligibility-start';
      break;
    case 'apply-someone':
      redirectUrl = '/apply/v23/1-eligibility/cannot-apply-online';
      break;
    case 'apply-help':
      redirectUrl = '/apply/v23/1-eligibility/helping-someone-apply';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});


//Do you have a disability or health condition that affects how much you can work?
router.route('/disability-or-health-condition')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['disability']) {
    case 'yes~/apply/v23/1-eligibility/state-pension':
      redirectUrl = '/apply/v23/1-eligibility/state-pension';
      break;
    case 'no~/apply/v23/1-eligibility/may-not-be-eligible':
      redirectUrl = '/apply/v23/1-eligibility/may-not-be-eligible';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});


// Are you under State Pension age?
router.route('/state-pension')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['state-pension']) {
    case 'yes~/apply/v23/1-eligibility/national-insurance':
      redirectUrl = '/apply/v23/1-eligibility/national-insurance';
      break;
    case 'no~/apply/v23/1-eligibility/may-not-be-eligible-state-pension':
      redirectUrl = '/apply/v23/1-eligibility/may-not-be-eligible-state-pension';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Have you been employed and paid National Insurance over the last 2 to 3 years?
router.route('/national-insurance')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['severe-disability']) {
    case 'yes~/apply/v23/1-eligibility/statutory-pay':
      redirectUrl = '/apply/v23/1-eligibility/statutory-pay';
      break;
    case 'no~/apply/v23/1-eligibility/may-not-be-eligible-national-insurance':
      redirectUrl = '/apply/v23/1-eligibility/may-not-be-eligible-national-insurance';
      break;
    case 'notsure~/apply/v23/1-eligibility/statutory-pay':
      redirectUrl = '/apply/v23/1-eligibility/statutory-pay';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Are you getting Statutory Sick Pay?
router.route('/statutory-pay')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['statutory-pay']) {
    case 'Yes':
      redirectUrl = '/apply/v23/1-eligibility/statutory-pay-date';
      break;
    case 'No':
      redirectUrl = '/apply/v23/1-eligibility/why-no-ssp';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Does your Statutory Sick Pay end in the next 3 months?
router.route('/statutory-pay-date')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['statutory-pay-end']) {
    case 'yes~/apply/v23/1-eligibility/may-be-eligible':
      redirectUrl = '/apply/v23/1-eligibility/may-be-eligible';
      break;
    case 'no~/apply/v23/1-eligibility/may-not-be-eligible-statutory-pay':
      redirectUrl = '/apply/v23/1-eligibility/may-not-be-eligible-statutory-pay';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Based on your answers, you may not be eligible for New Style ESA
router.route('/may-not-be-eligible')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['no-health-condition']) {
    case 'uc~https://www.gov.uk/universal-credit':
      redirectUrl = 'https://www.gov.uk/universal-credit';
      break;
    case 'nsjsa~https://www.gov.uk/jobseekers-allowance/':
      redirectUrl = 'https://www.gov.uk/jobseekers-allowance';
      break;
    case 'nsesa~/apply/v23/1-eligibility/state-pension':
      redirectUrl = '/apply/v23/1-eligibility/state-pension';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// NINO: Based on your answers, you may not be eligible for New Style ESA payments
router.route('/may-not-be-eligible-national-insurance')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['apply-for-uc']) {
    case 'no~/apply/v23/1-eligibility/statutory-pay':
      redirectUrl = '/apply/v23/1-eligibility/statutory-pay';
      break;
    case 'yes~https://www.gov.uk/universal-credit':
      redirectUrl = 'https://www.gov.uk/universal-credit';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

module.exports = router;
