var h = 200;
var w = 400;

monthlySales = [
     {"month":10, "sales":20},
     {"month":20, "sales":14},
     {"month":30, "sales":20},
     {"month":40, "sales":21},
     {"month":50, "sales":15},
     {"month":60, "sales":22},
     {"month":70, "sales":9},
     {"month":80, "sales":6},
     {"month":90, "sales":23},
     {"month":100, "sales":7}
];

var lineFun = d3.svg.line()
    .x(function(d) {return d.month*3;})
    .y(function(d) {return h-d.sales*5;})
    .interpolate('linear');

var svg = d3.select('body').append('svg').attr({width: w, height: h});

var viz = svg.append('path')
  .attr({
    d: lineFun(monthlySales),
    'stroke': 'purple',
    'stroke-width': 2,
    'fill': 'none'});

var labels = svg.selectAll('text')
  .data(monthlySales)
  .enter()
  .append('text')
  .text(function(d) {return d.sales;})
  .attr({
    x: function(d) {return d.month*3-20;},
    y: function(d) {return h-d.sales*5;},
    'font-size': '12px',
    'font-family': 'sans-serif',
    'fill': '#666666',
    'text-ancgir': 'start',
    'dy':'.35em',
    'font-weight': function(d, i) {
      if (i === 0 || i === (monthlySales.length - 1)) {return 'bold';}
    }
  });
