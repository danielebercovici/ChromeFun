function saveOptions() {
  var selectedFilter = document.getElementById('selectedFilter').value;

  chrome.storage.sync.set({
    Kfilter: selectedFilter
  }, function(items) {
    var status = document.getElementById('saveMessage');
    status.textContent = 'Filter selected - ' + items.filter; 
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function getOptions(callback) {
  chrome.storage.sync.get({
    Kfilter: 'aggro',
    Kardashians: 0,
    pages: 0
  }, function(items) {
    document.getElementById('selectedFilter').value = items.Kfilter;
    document.getElementById('Kardashiancount').textContent = items.Kardashians;
    document.getElementById('pagecount').textContent = items.pages;
    callback(items.Kfilter);
    return items.Kfilter;
  });
}

function restoreOptions() {
  getOptions(function(Kfilter) {
    document.getElementById('selectedFilter').value = Kfilter;
  });
  document.getElementById('selectedFilter').addEventListener('click', saveOptions);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
