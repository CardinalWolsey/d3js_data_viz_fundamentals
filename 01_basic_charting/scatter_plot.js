var h = 350;
var w = 400;

monthlySales = [
     {"month":10, "sales":100},
     {"month":20, "sales":130},
     {"month":30, "sales":250},
     {"month":40, "sales":300},
     {"month":50, "sales":265},
     {"month":60, "sales":225},
     {"month":70, "sales":180},
     {"month":80, "sales":120},
     {"month":90, "sales":145},
     {"month":100, "sales":130}
];

//makes dots above 250 have green color
function salesKPI(d) {
  if (d>=250) {return "#33cc66";}
  if (d<250) {return "#666666";}
}

//functionality for showing min and max values or all values
function showMinMax(ds, col, val, type) {
  var max = d3.max(ds, function(d) {return d[col];});
  var min = d3.min(ds, function(d) {return d[col];});

  if (type === 'minmax' && (val === max || val === min)) {return val;}
  if (type === 'all') {return val;}
}

//generate SVG
var svg = d3.select("body").append("svg").attr({ width:w, height: h});

//add the dots from the data
var dots = svg.selectAll('circle')
  .data(monthlySales)
  .enter()
  .append('circle')
  .attr({
    cx: function(d) {return d.month*3;},
    cy: function(d) {return h-d.sales;},
    r: 5,
    'fill': function(d) {return salesKPI(d.sales);}
    });

//labels for the points, with option of labeling all or
//only min and max points
var labels = svg.selectAll('text')
  .data(monthlySales)
  .enter()
  .append('text')
  .text(function(d) {return showMinMax(monthlySales, 'sales', d.sales, 'minmax');})
  .attr({
    x: function(d) {return (d.month*3)-25;},
    y: function(d) {return h-d.sales},
    'font-family': 'sans-serif',
    'font-size': '12px',
    'fill': '#666666',
    'text-anchor': 'start'
  });
