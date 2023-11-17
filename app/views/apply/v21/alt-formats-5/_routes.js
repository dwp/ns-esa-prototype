var express = require('express');
var router = express.Router();

const BASE_PATH = 'apply/v20/alt-formats-5';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/apply/alt-formats-5';




router.post('/contact-phone', function (req, res) {
var answer = req.session.data['contact-telephone-number-af'];

  if (answer === 'yes') {
  res.redirect(`${ABS_BASE_PATH}/contact-phone-af-yes`);
} else {
  res.redirect(`${ABS_BASE_PATH}/contact-do-you-have-an-email`);
}
});




router.post('/alternate-format', function (req, res) {
  const answer = req.body.AlternateFormat;
  console.log ('alternateformatloaded')

  if (answer === 'alternateFormatYes') {
    res.redirect(`${ABS_BASE_PATH}/letters-contact-preference`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/phone-contact-preference`);
  }
});


router.post('/email-personal-details', function (req, res) {
  const answer = req.body.Email;
  console.log ('alternateformatloaded')

  if (answer === 'Email') {
    res.redirect(`${ABS_BASE_PATH}/alternate-format`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/alternate-format`);
  }
});

router.post('/alternate-format-contact-preference', function (req, res) {
  let data = req.session.data;
  let answer;

  if (data['alternateFormatPreference']) {
    answer = data['alternateFormatPreference'];
  } else {
    answer = [];
  };

  answer = [].concat(answer);
  console.log(answer, typeof answer);

  if (answer.includes('letters')) {
    res.redirect(`${ABS_BASE_PATH}/letters-contact-preference`);
  } else if (answer.includes('phoneCalls')) {
    res.redirect(`${ABS_BASE_PATH}/phone-contact-preference`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/nino`);
  }

});



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
  } else if (answer.includes('colouredPaper')) {
    res.redirect(`${ABS_BASE_PATH}/coloured-paper`);
  } else if (answer.includes('colouredPaperLargePrint')) {
    res.redirect(`${ABS_BASE_PATH}/coloured-paper`);
  } else if (answer.includes('email')) {
    res.redirect(`${ABS_BASE_PATH}/email`);
    // add more here
  } else if (answer.includes('largePrint')) {
    res.redirect(`${ABS_BASE_PATH}/large-print`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/phone-contact-preference`);
  }

});

router.post('/phone-contact-preference', function (req, res) {
  let data = req.session.data;
  let answer;


  if (data['phoneContactPreference']) {
  answer = data['phoneContactPreference'];
  } else {
  answer = [];
  };

  answer = [].concat(answer);
  console.log(answer, typeof answer);

  if (answer.includes('relayUk')) {
  res.redirect(`${ABS_BASE_PATH}/relay-uk`);
  } else if (answer.includes('textphone')) {
  res.redirect(`${ABS_BASE_PATH}/text-phone`);
  } else if (answer.includes('emailPhone')) {
  res.redirect(`${ABS_BASE_PATH}/email-phone`);


  }});


/*/
router.post('/phone-contact-preference', function (req, res) 
{ 
  let data = req.session.data;
  let answer;
  if (data['phoneContactPreference']) {
    answer = data['phoneContactPreference'];
  } else {
    answer = [];
  };

  answer = [].concat(answer);
  console.log(answer, typeof answer);

  if (answer.includes('emailPhone')) {
    res.redirect(`${ABS_BASE_PATH}/email-phone`);
  } else if (answer.includes('textphone')) {
    res.redirect(`${ABS_BASE_PATH}/textphone`);
  }
}); */
module.exports = router;