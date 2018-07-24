$(document).ready(function () {
  $('#filter select').select2({
    theme: 'bootstrap',
    closeOnSelect: false
  });

  $('.datepicker').datepicker({
    autoclose: true,
    todayHighlight: true,
    format: 'yyyy/mm/dd'
  });
});