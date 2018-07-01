'use strict';

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