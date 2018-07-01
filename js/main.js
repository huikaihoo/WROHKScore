'use strict';

var space;

function init() {
  // Initialize Configs
  initConfig();

  // Initialize library
  initDataTable();
  initTabletop();

  // Initialize UI
  initUI();
}
function initDataTable() {
  space.table = $('#table_space').DataTable({
    columns: [
      { data: 'Group' },
      { data: 'Team' },
      { data: 'School' },
      { data: 'Round', searchable: false },
      { data: 'Score', searchable: false },
      { data: 'Time', searchable: false }
    ],
    order: [[4, 'desc'], [5, 'asc']]
  });
  $('#table_speed').DataTable();
}

function initTabletop() {
  Tabletop.init( { key: space.url,
                   callback: showData,
                   simpleSheet: true } );
}

function showData(data) {
  // Get target section
  var section;
  if (this.googleSheetName == space.sheetName) {
    section = space;
  }

  // Show data on target section
  if (section) {
    section.data = data;
    section.table.rows.add(section.filter()).draw();
  }

  $('#data').html(JSON.stringify(data));
  console.log(data);
}

function initUI() {
  $('.ui.item').on('click', itemHandler);
}

function itemHandler() {
  // Upate UI
  $(this).addClass('active')
    .siblings('.item')
    .removeClass('active');

  // Get target section
  var section;
  if ($(this).hasClass('space')) {
    section = space;
  }

  // Apply filter action on target section
  if (section) {
    if ($(this).hasClass('group')) {
      section.group = $(this).attr('value');
    }
    if ($(this).hasClass('round')) {
      section.round = $(this).attr('value');
    }
    section.table.clear();
    section.table.rows.add(section.filter()).draw();
  }
}