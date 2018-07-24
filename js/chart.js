$(document).ready(function () {
  var startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  var endDate = new Date();

  $('#start-date').val(startDate.toLocaleDateString("ja-JP"));
  $('#end-date').val(endDate.toLocaleDateString("ja-JP"));

  genChart();

  $(document).on('change', '#start-date, #end-date, select', function() {
    genChart();
  });

  // $('#item1,#item2').change(function () {
  //   var startDate = $('#item1').val();
  //   var endDate = $('#item2').val();
  //   var checkDate = parseInt(startDate.replace(/\//gi, '')) > parseInt(endDate.replace(/\//gi, '')) ? false : true;

  //   if (startDate !== '' && endDate !== '' && checkDate) {
  //     // Usage
  //     let dates = getDates(new Date(startDate), new Date(endDate));
  //     chartInit = genChart(dates);
  //   }
  // });

  // $('.select2').change(function () {

  //   var difference = [];
  //   var listSelect = M.FormSelect.getInstance($(this)).getSelectedValues();
  //   difference = array_diff(listInit, listSelect);

  //   chartInit.show(listSelect);
  //   chartInit.hide(difference);
  // });
});

function array_diff(array1, array2) {
  var difference = $.grep(array1, function (el) {
    return $.inArray(el, array2) < 0
  });
  return difference.concat($.grep(array2, function (el) {
    return $.inArray(el, array1) < 0
  }));;
}

function genChart() {
  var startDate = $('#start-date').val();
  var endDate = $('#end-date').val();
  var dates = getDates(new Date(startDate), new Date(endDate));

  var total = dates.length - 1;
  var shopA = genDataShop('ShopA', total);
  var shopB = genDataShop('ShopB', total);
  var shopC = genDataShop('ShopC', total);
  var shopD = genDataShop('ShopD', total);
  var shopE = genDataShop('ShopE', total);

  chartInit = c3.generate({
    data: {
      x: 'x',
      xFormat: '%Y/%m/%d',
      columns: [
        dates,
        shopA,
        shopB,
        shopC,
        shopD,
        shopE
      ]
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        },
        extent: [13, 16]
      },
    },
    padding: {
      right: 25
    },
    subchart: {
      show: true
    },
    point: {
      show: false
    }
  });

  return chartInit;
}


function genDataShop(name, numberRecord) {
  var dataShop = [name];

  for (var i = 1; i <= numberRecord; i++) {
    dataShop.push(genData());
  }

  return dataShop;
}

// Returns an array of dates between the two dates
var getDates = function (startDate, endDate) {
  var dates = ['x'],
    currentDate = startDate,
    addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date
    };

  while (currentDate <= endDate) {
    dates.push(currentDate.toLocaleDateString("ja-JP"));
    currentDate = addDays.call(currentDate, 1);
  }

  return dates;
};

function genData() {
  return Math.floor(Math.random() * 500) + 1000;
}