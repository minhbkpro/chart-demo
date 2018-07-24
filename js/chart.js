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

  if(startDate == '' || endDate == '') return;

  var total = dates.length - 1;
  var shops = $('select').val();

  if(shops.length == 0) return;

  var kibo = ['希望販売価格'];
  var kiboKakaku = 1800;

  for (var i = 1; i <= total; i++) {
    kibo.push(kiboKakaku);
  }

  var columns = [dates, kibo];
  shops.forEach(function(shopName) {
    columns[columns.length] = genDataShop(shopName, total);
  });

  chartInit = c3.generate({
    data: {
      x: 'x',
      xFormat: '%Y/%m/%d',
      columns: columns,
      colors: {
        '希望販売価格': '#777'
      },
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        },
        label: '時間'
      },
      y: {
        label: '￥'
      }
    },
    padding: {
      right: 25
    },
    subchart: {
      show: true
    },
    point: {
      show: false
    },
    tooltip: {
      format: {
        value: function (value, ratio, id, index) {
          var format = d3.format(',');
          var percent = (value - 1800)/value*100;
          if(id === '希望販売価格') return '￥' + format(value);
          else if(Math.abs(percent) < 10) return '￥'+format(value)+'('+ percent.toFixed(2) +'%)';
          else return '<b style="color: red">￥'+format(value)+'('+ percent.toFixed(2) +'%)</b>';
        }
      }
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
  return Math.floor(Math.random() * 500) + 1500;
}