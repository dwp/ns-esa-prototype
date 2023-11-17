/* global $ */

//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//


$(document).ready(function () {
})

// Autocomplete
// var autocomplete = document.querySelector('[data-source]')
// if (autocomplete) {
//   accessibleAutocomplete.enhanceSelectElement({
//     // showNoOptionsFound: false;
//     defaultValue: '',
//     selectElement: autocomplete
//   })
// }

// COOKIE BANNER START

function initializeAnalytics() {
	var acceptAllCookies = localStorage.getItem('acceptAllCookies')
	if (acceptAllCookies == 'true') {
		window.dataLayer = window.dataLayer || []
		function gtag() {
			dataLayer.push(arguments)
		}
		gtag('js', new Date())
		gtag('config', 'UA-XXXXXXXX-XX')
	}
}

initializeAnalytics()

function deleteAllCookies() {
	var cookies = document.cookie.split(';')

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i]
		var eqPos = cookie.indexOf('=')
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
	}
}

function processCookiesToggle() {
	var acceptAllCookies = window.localStorage.getItem('acceptAllCookies')
	if (acceptAllCookies == 'true') {
		$('.toggle-cookies .accept-cookies').hide()
		$('.toggle-cookies .functional-cookies').show()
	} else {
		$('.toggle-cookies .accept-cookies').show()
		$('.toggle-cookies .functional-cookies').hide()
	}
}

function saveCookieChoice(allow) {
	window.localStorage.setItem('acceptAllCookies', allow)
	window.localStorage.setItem('seenCookieBanner', true)
	var $cookieBanner = $('.casa-cookie-banner')
	if (!allow) {
		deleteAllCookies()
		$cookieBanner.addClass('casa-cookie-banner-show-reject')
	} else {
		$cookieBanner.addClass('casa-cookie-banner-show-accept')
	}
	processCookiesToggle()
	initializeAnalytics()
}

function processCookieBanner() {
	var seenCookieBanner = window.localStorage.getItem('seenCookieBanner')
	if (seenCookieBanner == null) {
		window.localStorage.setItem('seenCookieBanner', 'false')
	}
	var $cookieBanner = $('.casa-cookie-banner')
	if (!(seenCookieBanner == 'true')) {
		$('body').prepend($cookieBanner)
		$cookieBanner.css('display', 'block')
	} else {
		$cookieBanner.remove()
	}
	processCookiesToggle()
}

function hideCookieBanner() {
	var $cookieBanner = $('.casa-cookie-banner')
	$cookieBanner.remove()
}

processCookieBanner()

// COOKIE BANNER END

// Set month names
var monthNames = [
	"January", "February", "March",
	"April", "May", "June", "July",
	"August", "September", "October",
	"November", "December"
	];
	
// Another crude hack from Dan to display month nunbers (don't know how to do this properly)	
var monthNumbers = [
		"1", "2", "3",
		"4", "5", "6", "7",
		"8", "9", "10",
		"11", "12"
		];
  
  // Show current date
  date = new Date();
  y = date.getFullYear();
  m = date.getMonth();
  d = date.getDate();
  
  if(document.querySelector(".date")) {
	document.querySelector(".date").innerHTML = d + " " + monthNames[m] + " " + y;
  }
  
  // Show future date
  newDate = new Date();
  var numberOfDaysToAdd = 14;
  newDate.setDate(newDate.getDate() + numberOfDaysToAdd);
  ny = newDate.getFullYear();
  nm = newDate.getMonth();
  nd = newDate.getDate();
  
  if(document.querySelector(".new-date")) {
	document.querySelector(".new-date").innerHTML = nd + "&nbsp" + monthNames[nm] + "&nbsp" + ny;
  }


    // Show date 3 months ago. Sorry, this is wack – can't work out how to do it properly, so just crudely minusing 91 days (Dan)
	date3MonthsAgo = new Date();
	var numberOfDaysToAdd = -91;
	date3MonthsAgo.setDate(date3MonthsAgo.getDate() + numberOfDaysToAdd);
	py = date3MonthsAgo.getFullYear();
	pm = date3MonthsAgo.getMonth();
	pd = date3MonthsAgo.getDate();
	
	if(document.querySelector(".date-3-months-ago")) {
	  document.querySelector(".date-3-months-ago").innerHTML = pd + " " + monthNumbers[pm] + " " + py;
	}

	// suggest claim date

	var suggestedClaimDate = document.querySelector(".suggested-claim-date");
	if(suggestedClaimDate) {
	var claimDate = new Date(
		parseInt(suggestedClaimDate.getAttribute('data-year'), 10),
		parseInt(suggestedClaimDate.getAttribute('data-month'), 10)-1,
		parseInt(suggestedClaimDate.getAttribute('data-day'), 10)
	);
	var numberOfDaysToAdd = 1;
	claimDate.setDate(claimDate.getDate() + numberOfDaysToAdd);
	ny = claimDate.getFullYear();
	nm = claimDate.getMonth();
	nd = claimDate.getDate();
	suggestedClaimDate.innerHTML = nd + "&nbsp" + monthNames[nm] + "&nbsp" + ny;
}