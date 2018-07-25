$(document).ready(function () {
  var startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  var endDate = new Date();

  $('#start-date').val(startDate.toLocaleDateString("ja-JP"));
  $('#end-date').val(endDate.toLocaleDateString("ja-JP"));

  genChart();

  $(document).on('change', 'select', function() {
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
  var products = ['なんでも雑巾', 'これからコップ', 'そうだねフライパン', 'まだまだ湯のみ', 'なんだよオタマ'];

  if(shops.length == 0) return;

  var kibo = ['希望販売価格'];
  var kiboKakaku = 1800;

  for (var i = 1; i <= total; i++) {
    kibo.push(kiboKakaku);
  }

  var columns = [];

  var x = ['x'];
  shops.forEach(function(shopName) {
    x.push(shopName);
  });

  products.forEach(function(productName, index) {
    var data = [productName];
    for(var i = 0; i < shops.length; i ++) {
      data.push(Math.floor(Math.random() * 1000) + 1000 * (index + 1));
    }
    columns.push(data);
  });

  columns.reverse();
  columns.unshift(x);

  chartInit = c3.generate({
    data: {
      x: 'x',
      columns: columns,
    },
    axis: {
      x: {
        type: 'category',
        label: 'ショップ'
      },
      y: {
        show: false
      }
    },
    padding: {
      right: 25
    },
    subchart: {
      show: true
    },
    tooltip: {
      format: {
        value: function (value, ratio, id, index) {
          var format = d3.format(',');
          return '￥' + format(value - products.indexOf(id) * 1000);
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