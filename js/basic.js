'use strict';

// Section object
function Section(sheetName, url) {
  this.sheetName = sheetName;
  this.url = url;

  this.table = null;
  this.data = null;

  // For Filtering
  this.group = "0";
  this.round = "0";
}

Section.prototype.filter = function() {
  var section = this;
  var result = [];

  section.data.forEach(function(record) {
    var validRound = (section.round == "0") || (section.round == record.Round);
    var validGroup = (section.group == "0") || (section.group == record.Group);

    if (validRound && validGroup) {
      result.push(record);
    }
  });

  return result;
}

// Loader object
function Loader() {
  var cnt = 0;
  var updateUI = function() {
    if (cnt <= 0) {
      $('#loader_loading').addClass('hidden');
      $('#loader_finish').removeClass('hidden');
    } else {
      $('#loader_loading').removeClass('hidden');
      $('#loader_finish').addClass('hidden');
    }
  }

  this.getCnt = function() {
    return cnt;
  }

  this.setCnt = function(val) {
    cnt = val;
    updateUI();
  }

  this.changeCnt = function(val) {
    cnt += val;
    updateUI();
  }
}

// Table language
var tableLanguage = {
  lengthMenu: '每頁顯示 _MENU_ 個項目',
  search: '<i class="search icon"></i>',
  zeroRecords: '沒有項目',
  info: '項目總數: _TOTAL_ 個',
  infoEmpty: '項目總數: _TOTAL_ 個',
  infoFiltered: '',
  paginate: {
    first: '<i class="angle double left icon"></i>',
    last: '<i class="angle double left icon"></i>',
    previous: '<i class="angle left icon"></i>',
    next: '<i class="angle right icon"></i>'
  }
}