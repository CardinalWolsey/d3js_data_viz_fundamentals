var h = 100;
var w = 400;
var ds;

//builds the line
function buildLine() {

  //creates tje svg on the page
  var svg = d3.select('body').append('svg').attr({height: h, width:w});

  //constructs the line from data
  var lineFunction = d3.svg.line()
    .x(function(d) {return ((d.month-20130001)/3.25);})
    .y(function(d) {return (h-d.sales);})
    .interpolate('linear');

  //draw the line
  var viz = svg.append('path')
    .attr({
      //pass in data
      d: lineFunction(ds),
      'stroke': 'purple',
      'stroke-width': 2,
      'fill': 'none'
    });
}

//builds the table
function showTotals() {
  var salesTotal = 0.0;
  var salesAverage = 0.0;
  var metrics = [];

  //appends table
  var t = d3.select('body').append('table');

  //gets total
  for (var i = 0; i < ds.length; i++) {
    salesTotal +=ds[i]['sales']*1
  }

  salesAverage = salesTotal/ds.length;

  metrics.push('Sales Total: ' + salesTotal);
  metrics.push('Sales Average: ' + salesAverage.toFixed(2));

  var tr = t.selectAll('tr')
    .data(metrics)
    .enter()
    .append('tr')
    .append('td')
    .text(function(d) {return d});
}

//retrieves data and calls functions
d3.csv("monthly_sales.csv", function(err, data) {
  if (err) {console.log(err);}
  if (data) {
    console.log(data);
    ds = data;
  }

  buildLine();
  showTotals();
});
