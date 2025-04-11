var express = require('express');
var router = express.Router();

const BASE_PATH = 'apply/v23/7-voluntary-work';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/apply/v23/8-paid-work';

// Are you currently doing any voluntary work?
router.route('/voluntary-work')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['voluntary']) {
    case 'Yes':
      redirectUrl = '/apply/v23/7-voluntary-work/voluntary-details';
      break;
    case 'No':
      redirectUrl = '/apply/v23/8-paid-work/work';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Do you do any other voluntary work?
router.route('/voluntary-work-another')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['voluntary-another']) {
    case 'Yes':
      redirectUrl = '/apply/v23/7-voluntary-work/voluntary-details';
      break;
    case 'No':
      redirectUrl = '/apply/v23/8-paid-work/work';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

module.exports = router;
