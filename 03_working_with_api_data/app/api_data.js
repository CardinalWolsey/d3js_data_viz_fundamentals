var h = 100;
var w = 400;
var ds;


//show header information
function showHeader(ds) {
  d3.select('body').append('h1').text(ds.category + ' Sales 2013');
}

//builds the line
function buildLine(ds) {

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
