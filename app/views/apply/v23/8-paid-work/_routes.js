var express = require('express');
var router = express.Router();

const BASE_PATH = 'apply/v23/8-paid-work';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/apply/v23/9-statutory-pay';


// Are you currently employed or self-employed, even if you’re unable to work at the moment?
router.route('/work')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['work']) {
    case 'Yes':
      redirectUrl = '/apply/v23/8-paid-work/employment-status';
      break;
    case 'No':
      redirectUrl = '/apply/v23/8-paid-work/statutory-pay-recent';
      break;
    case 'No':
      redirectUrl = '/apply/v23/8-paid-work/statutory-pay-recent';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Are you off sick from your job at <employer name>?
router.route('/worksick')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['offSick']) {
    case 'Yes':
      redirectUrl = '/apply/v23/8-paid-work/last-work';
      break;
    case 'No':
      redirectUrl = '/apply/v23/8-paid-work/work-hours';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Do you have another job?
router.route('/work-another')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['work-another']) {
    case 'Yes~/apply/v23/8-paid-work/employment-status':
      redirectUrl = '/apply/v23/8-paid-work/employment-status';
      break;
    case 'No~/apply/v23/8-paid-work/statutory-pay-end':
      redirectUrl = '/apply/v23/8-paid-work/statutory-pay-end';
      break;
    case 'no~/apply/v23/8-paid-work/statutory-pay-recent':
      redirectUrl = '/apply/v23/8-paid-work/statutory-pay-recent';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Do you work the same number of hours each week at data['employer-details-1']?
router.route('/work-hours')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['work-hours']) {
    case 'yes~/apply/v23/8-paid-work/payfrequency':
      redirectUrl = '/apply/v23/8-paid-work/payfrequency';
      break;
    case 'no~/apply/v23/8-paid-work/pay-varies-frequency':
      redirectUrl = '/apply/v23/8-paid-work/pay-varies-frequency';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Do you get help from a professional support worker at data['employer-details-1']?
router.route('/work-supported')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['work-supported']) {
    case 'Yes':
      redirectUrl = '/apply/v23/8-paid-work/expenses';
      break;
    case 'No':
      redirectUrl = '/apply/v23/8-paid-work/expenses';
      break;
    case 'I’m not sure':
      redirectUrl = '/apply/v23/8-paid-work/expenses';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

//  Does data['employer-details-1']pay you any expenses?
router.route('/expenses')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['expenses']) {
    case 'yes~/apply/v23/8-paid-work/expenses-details':
      redirectUrl = '/apply/v23/8-paid-work/expenses-details';
      break;
    case 'no~/apply/v23/8-paid-work/work-another':
      redirectUrl = '/apply/v23/8-paid-work/work-another';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

module.exports = router;
