const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

  var filters = {}

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  filters.toMonth = function(x){
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (x > 0){
      return months[x - 1]; // returns date as per month
    }
    else {
      return x ;
    }
  }

  filters.sayHi = function(name,tone) {
    return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
  }

  filters.split = function(str, separator) {
    if (str)
    {
      return str.split(separator).filter(function(el){return el;});
    } else {
      return '';
    }
    
  }

// Add the filters using the addFilter function
Object.entries(filters).forEach(([name, fn]) => addFilter(name, fn))




