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





+ const prototypeFilters = require('@x-govuk/govuk-prototype-filters');

  module.exports = function (env) {
    /**
     * Instantiate object used to store the methods registered as a
     * 'filter' (of the same name) within nunjucks. You can override
     * gov.uk core filters by creating filter methods of the same name.
     * @type {Object}
     */
-   var filters = {}
+   var filters = prototypeFilters

    // Existing filter
    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    return filters
  }