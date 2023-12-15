//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();
const moment = require('moment');

// Add your routes here


// Code supplied by Gary for dealing with query strings
router.use(function(req, res, next){
  Object.assign(res.locals,{
    postData: (req.body ? req.body : false)
  });

  Object.assign(res.locals,{
    getData: (req.query ? req.query : false)
  });

  next();
});

var path = require('path')

// Data sources
router.all('/data/:data/source/:source', (req, res) => {
  const { data, source } = req.params
  res.json(require(`./data/${data}/source/${source}`))
})

































// Adding the moment plug in for Claim Date screen
router.get('/*/claimdate', function (req, res, next) {
  var ssp = req.session.data['ssp-dob-year'] + '-' +req.session.data['ssp-dob-month'] + '-' + req.session.data['ssp-dob-day'];
  ssp = moment(ssp, 'YYYY-MM-DD');
  
  var recent = req.session.data['ssp-recent-dob-year'] + '-' +req.session.data['ssp-recent-dob-month'] + '-' + req.session.data['ssp-recent-dob-day'];
  recent = moment(recent, 'YYYY-MM-DD');
  
  var last = req.session.data['last-dob-year'] + '-' +req.session.data['last-dob-month'] + '-' + req.session.data['last-dob-day'];
  last = moment(last, 'YYYY-MM-DD');
  
  var dateToShow, whichDate;
  if (last.isValid() && req.session.data['self-employed'] == 'mines') {
    whichDate = 'lastWorked';
    dateToShow = last;
  }

  if(recent.isValid()) {
    whichDate = 'sspRecent';
    dateToShow = recent;
  }

  if(ssp.isValid()) {
    whichDate = 'ssp';
    dateToShow = ssp;
  }

  if(dateToShow > moment().subtract(3, 'months')) {
    dateToShow.add(1, 'days');
    res.locals.dateToShow = dateToShow.format('D MMMM YYYY');
    res.locals.whichDate = whichDate;
  } else {
    res.locals.whichDate = whichDate;
    res.locals.date3monthsAgo = moment().subtract(3, 'months').add(1, 'days').format('D MMMM YYYY')
  }

  next();
})





































































// Adding the moment plug in for the fit for work screen
router.get('/*/fit-for-work', function (req, res, next) {
  var ssp = req.session.data['ssp-dob-year'] + '-' +req.session.data['ssp-dob-month'] + '-' + req.session.data['ssp-dob-day'];
  ssp = moment(ssp, 'YYYY-MM-DD');
  
  var recent = req.session.data['ssp-recent-dob-year'] + '-' +req.session.data['ssp-recent-dob-month'] + '-' + req.session.data['ssp-recent-dob-day'];
  recent = moment(recent, 'YYYY-MM-DD');
  
  var last = req.session.data['last-dob-year'] + '-' +req.session.data['last-dob-month'] + '-' + req.session.data['last-dob-day'];
  last = moment(last, 'YYYY-MM-DD');
  
  var dateToShow, whichDate;
  if (last.isValid() && req.session.data['self-employed'] == 'mines') {
    whichDate = 'lastWorked';
    dateToShow = last;
  }

  if(recent.isValid()) {
    whichDate = 'sspRecent';
    dateToShow = recent;
  }

  if(ssp.isValid()) {
    whichDate = 'ssp';
    dateToShow = ssp;
  }

  if(dateToShow > moment().subtract(3, 'months')) {
    dateToShow.add(1, 'days');
    res.locals.dateToShow = dateToShow.format('D MMMM YYYY');
    res.locals.whichDate = whichDate;
  } else {
    res.locals.whichDate = whichDate;
    res.locals.date3monthsAgo = moment().subtract(3, 'months').add(1, 'days').format('D MMMM YYYY')
  }

  next();
})

// Adding the moment plug in for List screen
router.get('/*/list', function (req, res, next) {
  var ssp = req.session.data['ssp-dob-year'] + '-' +req.session.data['ssp-dob-month'] + '-' + req.session.data['ssp-dob-day'];
  ssp = moment(ssp, 'YYYY-MM-DD');
  
  var recent = req.session.data['ssp-recent-dob-year'] + '-' +req.session.data['ssp-recent-dob-month'] + '-' + req.session.data['ssp-recent-dob-day'];
  recent = moment(recent, 'YYYY-MM-DD');
  
  var last = req.session.data['last-dob-year'] + '-' +req.session.data['last-dob-month'] + '-' + req.session.data['last-dob-day'];
  last = moment(last, 'YYYY-MM-DD');
  
  var dateToShow, whichDate;
  if (last.isValid() && req.session.data['self-employed'] == 'mines') {
    whichDate = 'lastWorked';
    dateToShow = last;
  }

  if(recent.isValid()) {
    whichDate = 'sspRecent';
    dateToShow = recent;
  }

  if(ssp.isValid()) {
    whichDate = 'ssp';
    dateToShow = ssp;
  }

  if(dateToShow > moment().subtract(3, 'months')) {
    dateToShow.add(1, 'days');
    res.locals.dateToShow = dateToShow.format('D MMMM YYYY');
    res.locals.whichDate = whichDate;
  } else {
    res.locals.whichDate = whichDate;
    res.locals.date3monthsAgo = moment().subtract(3, 'months').add(1, 'days').format('D MMMM YYYY')
  }

  next();
})

// Code from Steven for dealing with variables on list page

router.get('/apply/v9/list', (req, res, next) => {

  if (!req.session.sectionStatus){
    // console.log('no session');
    req.session.sectionStatus = {
      // cwyn: 'complete',
      yourhealth: undefined,
      paidwork: undefined,
      ssp: undefined,
      voluntarywork: undefined,
      pension: undefined,
      insurance: undefined,
      yourdetails: undefined,
      // submitted: undefined,
    }
  }

  if (req.query.yourhealth) {
    req.session.sectionStatus.yourhealth = req.query.yourhealth
  };
  if (req.query.paidwork) {
    req.session.sectionStatus.paidwork = req.query.paidwork
  };
  if (req.query.ssp) {
    req.session.sectionStatus.ssp = req.query.ssp
  };
  if (req.query.voluntarywork) {
    req.session.sectionStatus.voluntarywork = req.query.voluntarywork
  };
  if (req.query.pension) {
    req.session.sectionStatus.pension = req.query.pension
  };
  if (req.query.insurance) {
    req.session.sectionStatus.insurance = req.query.insurance
  };
  if (req.query.yourdetails) {
    req.session.sectionStatus.yourdetails = req.query.yourdetails
  };
  if (req.query.submitted) {
    req.session.sectionStatus.submitted = req.query.submitted
  };

  res.render('apply/v9/list.html', {sectionStatus: req.session.sectionStatus});
});


// Clear data on the 'application cancelled' screen

router.get('/*/clear-v9', function (req, res) {
  req.session.destroy()
  res.render('apply/v9/application-cancelled')
})



// Page routing
router.get('*', function (req, res, next) {
  if (req.params[0].substr(-1) == '/') res.locals.path = req.params[0].slice(0,-1).substr(1);
  else res.locals.path = path.dirname(req.params[0]).substr(1);
  next();
})


// if postcode is in Wales, show the contact preference questions - v15
router.post('/welsh-or-not-15', function (req, res) {

  const welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/v15/language-preference-writing')
  } else {
    res.redirect('/apply/v15/telephone')
  }
})

// if postcode is in Wales, show the contact preference questions - v16
router.post('/welsh-or-not-16', function (req, res) {

  var welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/v16/language-preference-writing');
    
  } else {
    res.redirect('/apply/v16/telephone')
  }
})

// if postcode is in Wales, show the contact preference questions - v17
router.post('/welsh-or-not-17', function (req, res) {

  const welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/v17/language-preference-writing')
  } else {
    res.redirect('/apply/v17/telephone')
  }
})

// if postcode is in Wales, show the contact preference questions - v18
router.post('/welsh-or-not-18', function (req, res) {

  const welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/v21/language-preference-writing')
  } else {
    res.redirect('/apply/v21/telephone')
  }
})

// if postcode is in Wales, show the contact preference questions - Live
router.post('/welsh-or-not', function (req, res) {

  const welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/live/language-preference-writing')
  } else {
    res.redirect('/apply/live/telephone')
  }
})

// if claim start date is more than 3 months ago, take them to Are you sure page - if using for research change '1'. For example, it's December so you need to addd all months before September.

router.post('/apply/v16/claimdate', function (req, res) {

  const claimMonth = req.session.data['claim-month']

  if (claimMonth == '1') {
    res.redirect('/apply/v16/late-claim')
  } else {
    res.redirect('/apply/v16/claim-end-date')
  }
})

router.post('/apply/v17/claimdate', function (req, res) {

  const claimMonth = req.session.data['claim-month']

  if (claimMonth == '1') {
    res.redirect('/apply/v17/late-claim')
  } else {
    res.redirect('/apply/v17/claim-end-date')
  }
})

router.post('/apply/live/claimdate', function (req, res) {

  const claimMonth = req.session.data['claim-month']

  if (claimMonth == '1') {
    res.redirect('/apply/live/late-claim')
  } else {
    res.redirect('/apply/live/claim-end-date')
  }
})

// alt format version 2

router.post('/apply/v18/alt-formats-2/what-alt-format', function (req, res) {

  const altFormat = req.session.data['alt-format']

  if (altFormat == 'large-print') {
    res.redirect('/apply/v18/alt-formats-2/which-font-size')
  } 
  if (altFormat == 'something-else') {
    res.redirect('/apply/v18/alt-formats-2/what-how-alt')
  } 
  
  else {
    res.redirect('/apply/v18/alt-formats-2/which-font-size')
  }
})

// alt format version 3

router.post('/apply/v18/alt-formats-3/what-alternative-format', function (req, res) {

  const altFormat = req.session.data['alt-format']

  if (altFormat == 'large-print') {
    res.redirect('/apply/v18/alt-formats-3/which-font-size')
  } 
  if (altFormat == 'something-else') {
    res.redirect('/apply/v18/alt-formats-3/other-alternative-formats')
  } 
  
  else {
    res.redirect('/apply/v18/alt-formats-3/which-font-size')
  }
})

router.post('/apply/v18/alt-formats-3/other-alternative-formats', function (req, res) {

  const altFormat = req.session.data['alt-format-list']

  if (altFormat == 'another-format') {
    res.redirect('/apply/v18/alt-formats-3/alternative-format-details')
  } 
  
  else {
    res.redirect('/apply/v18/alt-formats-3/address')
  }
})

// alt format v 4
// moves alt formats v4 route to folder
router.use(
  "/apply/v18/alt-formats-4/",
  require("./views/apply/v18/alt-formats-4/_routes")
);

router.use(
  "/apply/v18/alt-formats-5/",
  require("./views/apply/v18/alt-formats-5/_routes")
);

router.use(
  "/apply/v20/alt-formats-5/",
  require("./views/apply/v20/alt-formats-5/_routes")
);

// Routes you to state-pension or may-not-be-eligible at the first radio button screen
router.route('/apply/v21/disability-or-health-condition')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['disability']) {
    case 'yes~/apply/v21/state-pension':
      redirectUrl = '/apply/v21/state-pension';
      break;
    case 'no~/apply/v21/may-not-be-eligible':
      redirectUrl = '/apply/v21/may-not-be-eligible';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/state-pension')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['state-pension']) {
    case 'yes~/apply/v21/national-insurance':
      redirectUrl = '/apply/v21/national-insurance';
      break;
    case 'no~/apply/v21/may-not-be-eligible-state-pension':
      redirectUrl = '/apply/v21/may-not-be-eligible-state-pension';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/national-insurance')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['severe-disability']) {
    case 'yes~/apply/v21/statutory-pay':
      redirectUrl = '/apply/v21/statutory-pay';
      break;
    case 'no~/apply/v21/may-not-be-eligible-national-insurance':
      redirectUrl = '/apply/v21/may-not-be-eligible-national-insurance';
      break;
    case 'notsure~/apply/v21/statutory-pay':
      redirectUrl = '/apply/v21/statutory-pay';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/statutory-pay')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['statutory-pay']) {
    case 'Yes':
      redirectUrl = '/apply/v21/statutory-pay-date';
      break;
    case 'No':
      redirectUrl = '/apply/v21/why-no-ssp';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/statutory-pay-date')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['statutory-pay-end']) {
    case 'yes~/apply/v21/may-be-eligible':
      redirectUrl = '/apply/v21/may-be-eligible';
      break;
    case 'no~/apply/v21/may-not-be-eligible-statutory-pay':
      redirectUrl = '/apply/v21/may-not-be-eligible-statutory-pay';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/address')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['send-letters']) {
    case 'yes~/apply/v21/telephone':
      redirectUrl = '/apply/v21/telephone';
      break;
    case 'no~/apply/v21/correspondence-address':
      redirectUrl = '/apply/v21/correspondence-address';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/telephone')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['mobile-phone']) {
    case 'yes~/apply/v21/email':
      redirectUrl = '/apply/v21/email';
      break;
    case 'no~/apply/v21/landline':
      redirectUrl = '/apply/v21/landline';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/condition-another')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['condition-another']) {
    case 'yes':
      redirectUrl = '/apply/v21/condition';
      break;
    case 'no':
      redirectUrl = '/apply/v21/gpsurgery';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/live-less-than-12-months')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['terminal-illness']) {
    case 'Yes':
      redirectUrl = '/apply/v21/sr1-report';
      break;
    case 'No':
      redirectUrl = '/apply/v21/hospital';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/hospital')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['hospital']) {
    case 'Yes':
      redirectUrl = '/apply/v21/hospital-details';
      break;
    case 'No':
      redirectUrl = '/apply/v21/pregnant';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/pregnant')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['pregnancy']) {
    case 'Yes':
      redirectUrl = '/apply/v21/pregnant-due-date';
      break;
    case 'No':
      redirectUrl = '/apply/v21/consent';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/voluntary-work')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['voluntary']) {
    case 'Yes':
      redirectUrl = '/apply/v21/voluntary-details';
      break;
    case 'No':
      redirectUrl = '/apply/v21/work';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/voluntary-work-another')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['voluntary-another']) {
    case 'Yes':
      redirectUrl = '/apply/v21/voluntary-details';
      break;
    case 'No':
      redirectUrl = '/apply/v21/work';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/work')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['work']) {
    case 'Yes':
      redirectUrl = '/apply/v21/employment-status';
      break;
    case 'No':
      redirectUrl = '/apply/v21/statutory-pay-recent';
      break;
    case 'No':
      redirectUrl = '/apply/v21/statutory-pay-recent';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/worksick')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['offSick']) {
    case 'Yes':
      redirectUrl = '/apply/v21/last-work';
      break;
    case 'No':
      redirectUrl = '/apply/v21/work-hours';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/work-another')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['work-another']) {
    case 'Yes~/apply/v21/employment-status':
      redirectUrl = '/apply/v21/employment-status';
      break;
    case 'No~/apply/v21/statutory-pay-end':
      redirectUrl = '/apply/v21/statutory-pay-end';
      break;
    case 'no~/apply/v21/statutory-pay-recent':
      redirectUrl = '/apply/v21/statutory-pay-recent';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/work-hours')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['work-hours']) {
    case 'yes~/apply/v21/payfrequency':
      redirectUrl = '/apply/v21/payfrequency';
      break;
    case 'no~/apply/v21/pay-varies-frequency':
      redirectUrl = '/apply/v21/pay-varies-frequency';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/work-supported')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['work-supported']) {
    case 'Yes':
      redirectUrl = '/apply/v21/expenses';
      break;
    case 'No':
      redirectUrl = '/apply/v21/expenses';
      break;
    case 'I’m not sure':
      redirectUrl = '/apply/v21/expenses';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/expenses')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['expenses']) {
    case 'yes~/apply/v21/expenses-details':
      redirectUrl = '/apply/v21/expenses-details';
      break;
    case 'no~/apply/v21/work-another':
      redirectUrl = '/apply/v21/work-another';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/statutory-pay-end')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['statutory-pay-recent']) {
    case 'yes~/apply/v21/statutory-pay-end':
      redirectUrl = '/apply/v21/statutory-pay-end';
      break;
    case 'no~/apply/v21/statutory-pay-other':
      redirectUrl = '/apply/v21/statutory-pay-other';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/statutory-pay-other')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['statutory-pay-other']) {
    case 'Statutory Maternity Pay':
      redirectUrl = '/apply/v21/universal-credit';
      break;
    case 'Statutory Paternity Pay':
      redirectUrl = '/apply/v21/universal-credit';
      break;
    case 'Statutory Adoption Pay':
      redirectUrl = '/apply/v21/universal-credit';
      break;
    case 'Statutory Shared Parental Pay':
      redirectUrl = '/apply/v21/universal-credit';
      break;
    case 'None':
      redirectUrl = '/apply/v21/universal-credit';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/pension')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['pension']) {
    case 'Yes':
      redirectUrl = '/apply/v21/pension-inherit';
      break;
    case 'No':
      redirectUrl = '/apply/v21/insurance';
      break;
    case 'Not sure':
      redirectUrl = '/apply/v21/insurance';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/why-no-ssp')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['severe-disability']) {
    case '12weeks~/apply/v21/may-be-eligible':
      redirectUrl = '/apply/v21/may-be-eligible';
      break;
    case 'employmentended~/apply/v21/may-be-eligible':
      redirectUrl = '/apply/v21/may-be-eligible';
      break;
    case 'sickafter~/apply/v21/may-be-eligible':
      redirectUrl = '/apply/v21/may-be-eligible';
      break;
    case 'ssp28weeks~/apply/v21/may-be-eligible':
      redirectUrl = '/apply/v21/may-be-eligible';
      break;
    case 'zerohour~/apply/v21/may-be-eligible':
      redirectUrl = '/apply/v21/may-be-eligible';
      break;
    case 'anotherreason~/apply/v21/may-be-eligible':
      redirectUrl = '/apply/v21/may-be-eligible';
      break;
    case 'notsure~/apply/v21/may-be-eligible':
      redirectUrl = '/apply/v21/may-be-eligible';
      break;  
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/may-not-be-eligible')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['no-health-condition']) {
    case 'uc~https://www.gov.uk/universal-credit':
      redirectUrl = 'https://www.gov.uk/universal-credit';
      break;
    case 'nsjsa~https://www.gov.uk/jobseekers-allowance/':
      redirectUrl = 'https://www.gov.uk/jobseekers-allowance';
      break;
    case 'nsesa~/apply/v21/state-pension':
      redirectUrl = '/apply/v21/state-pension';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/landline')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['other-phone']) {
    case 'yes~/apply/v21/email':
      redirectUrl = '/apply/v21/email';
      break;
    case 'no~/apply/v21/email':
      redirectUrl = '/apply/v21/email';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/may-not-be-eligible-national-insurance')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['apply-for-uc']) {
    case 'no~/apply/v21/statutory-pay':
      redirectUrl = '/apply/v21/statutory-pay';
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

// Routes
router.route('/apply/v21/insurance')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['insurance']) {
    case 'Yes':
      redirectUrl = '/apply/v21/bank';
      break;
    case 'No':
      redirectUrl = '/apply/v21/bank';
      break;
    case 'Not sure':
      redirectUrl = '/apply/v21/bank';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/who-is-applying')
.post((req, res, next) => {
  req.session.destroy();
  let redirectUrl;
  switch (req.body['apply']) {
    case 'apply-myself':
      redirectUrl = '/apply/v21/eligibility-start';
      break;
    case 'apply-someone':
      redirectUrl = '/apply/v21/cannot-apply-online';
      break;
    case 'apply-help':
      redirectUrl = '/apply/v21/helping-someone-apply';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/claim-start-date-if-statutory-sick-pay')
.post((req, res, next) => {
  let redirectUrl;
  switch (req.body['claim-date-statutory-pay']) {
    case 'yes':
      redirectUrl = '/apply/v21/claim-end-date';
      break;
    case 'no':
      redirectUrl = '/apply/v21/claimdate-new';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});

// Routes
router.route('/apply/v21/universal-credit')
.post((req, res, next) => {
  let redirectUrl;
  var sspYear = req.session.data['ssp-year'];

  switch (sspYear !== undefined) {
    case true:
      redirectUrl = '/apply/v21/claim-start-date-if-statutory-sick-pay';
      break;
    case false:
      redirectUrl = '/apply/v21/claimdate-new';
      break;
    default:
      redirectUrl = req.path;
      break;
  }
  res.redirect(redirectUrl);
});


