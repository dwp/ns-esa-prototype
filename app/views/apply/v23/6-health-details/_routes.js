var express = require('express');
var router = express.Router();

const BASE_PATH = 'apply/v23/6-health-details';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/apply/v23/7-voluntary-work';



// Do you have another health condition, illness, disability or injury?
router.route('/condition-another')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['condition-another']) {
    case 'yes':
      redirectUrl = '/apply/v23/6-health-details/condition-max';
      break;
    case 'no':
      redirectUrl = '/apply/v23/6-health-details/gpsurgery';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Has your doctor said you might have less than 12 months to live due to any of your conditions?
router.route('/live-less-than-12-months')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['terminal-illness']) {
    case 'Yes':
      redirectUrl = '/apply/v23/6-health-details/sr1-report';
      break;
    case 'No':
      redirectUrl = '/apply/v23/6-health-details/hospital';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Are you currently staying in hospital as an inpatient?
router.route('/hospital')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['hospital']) {
    case 'Yes':
      redirectUrl = '/apply/v23/6-health-details/hospital-details';
      break;
    case 'No':
      redirectUrl = '/apply/v23/6-health-details/pregnant';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Are you pregnant?
router.route('/pregnant')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['pregnancy']) {
    case 'Yes':
      redirectUrl = '/apply/v23/6-health-details/pregnant-due-date';
      break;
    case 'No':
      redirectUrl = '/apply/v23/6-health-details/consent';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});


module.exports = router;
