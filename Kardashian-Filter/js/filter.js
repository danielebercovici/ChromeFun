/*
 * Kardashian Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of Kardashian from the web page.
 */

// Variables
var regex = /Kardashian/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering Kardashian with Mild filter...");
	return $(":contains('Kardashian'), :contains('KARDASHIAN'), :contains('kardashian')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering Kardashian with Default filter...");
	return $(":contains('Kardashian'), :contains('KARDASHIAN'), :contains('kardashian')").filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering Kardashian with Vindictive filter...");
	return $(":contains('Kardashian'), :contains('KARDASHIAN'), :contains('kardashian')").filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("Kardashian found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", Kardashians: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " Kardashians."); 
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
