var h = 100;
var w = 400;
var ds;


//show header information
function showHeader(ds) {
  d3.select('body').append('h1').text(ds.category + ' Sales 2013');
}

//builds the line
function buildLine(ds) {

  //xscale
  var xScale = d3.scale.linear()
    .domain([
      d3.min(ds.monthlySales, function(d) {return d.month;}),
      d3.max(ds.monthlySales, function(d) {return d.month;})
    ])
    .range([0, w])
    .nice();

  var yScale = d3.scale.linear()
    .domain([
      0,
      d3.max(ds.monthlySales, function(d) {return d.sales;})
    ])
    .range([h, 0])
    .nice();


  //creates tje svg on the page
  var svg = d3.select('body').append('svg').attr({height: h, width:w});

  //constructs the line from data
  var lineFunction = d3.svg.line()
    .x(function(d) {return xScale(d.month);})
    .y(function(d) {return yScale(d.sales);})
    .interpolate('linear');

  //draw the line
  var viz = svg.append('path')
    .attr({
      //pass in data
      d: lineFunction(ds.monthlySales),
      'stroke': 'purple',
      'stroke-width': 2,
      'fill': 'none'
    });
}

//retrieves data and calls functions
d3.json("https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json", function(err, data) {
  if (err) {console.log(err);}
  if (data) {
  }

  var decodedData = JSON.parse(window.atob(data.content));

  for (var i = 0; i < decodedData.contents.length; i++) {
    showHeader(decodedData.contents[i]);
    buildLine(decodedData.contents[i]);
  }

});
