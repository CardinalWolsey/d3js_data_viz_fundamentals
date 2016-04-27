var h = 100;
var w = 400;
var padding = 20;

//generate month names from numbers
function getDate(d) {
  var stringDate = new String(d);
  var year = stringDate.substr(0, 4);
  var month = stringDate.substr(4, 2);
  var day = stringDate.substr(6, 2);

  return new Date(year, month, day);
}

//show header information
function showHeader(ds) {
  d3.select('body').append('h1').text(ds.category + ' Sales 2013');
}

//builds the line
function buildLine(ds) {

  var minDate = getDate(ds.monthlySales[0]['month']);
  var maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]['month']);

  //scaling functions
  var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding, w-padding]);

  var yScale = d3.scale.linear()
    .domain([
      0,
      d3.max(ds.monthlySales, function(d) {return d.sales;})
    ])
    .range([h-padding, 10]);

  //axes functions construction
  var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format('%b'));

  var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(4);

  //creates the svg on the page
  var svg = d3.select('body').append('svg').attr({height: h, width:w, "id":"svg-" + ds.category});

  //constructs the line from data
  var lineFunction = d3.svg.line()
    .x(function(d) {return xScale(getDate(d.month));})
    .y(function(d) {return yScale(d.sales);})
    .interpolate('linear');

  //draw the axes
  var xAxis = svg.append('g').call(xAxisGen)
    .attr("class", "x-axis")
    .attr("transform", "translate(0, " +(h-padding)+ ")");

  var yAxis = svg.append('g').call(yAxisGen)
    .attr("class", "y-axis")
    .attr("transform", "translate(" + padding + ", 0)");

  //draw the line
  var viz = svg.append('path')
    .attr({
      //pass in data
      d: lineFunction(ds.monthlySales),
      'stroke': 'purple',
      'stroke-width': 2,
      'fill': 'none',
      'class': 'path-' + ds.category
    });
}

//updates the line
function updateLine(ds) {

  var minDate = getDate(ds.monthlySales[0]['month']);
  var maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]['month']);

  //scaling functions
  var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding, w-padding]);

  var yScale = d3.scale.linear()
    .domain([
      0,
      d3.max(ds.monthlySales, function(d) {return d.sales;})
    ])
    .range([h-padding, 10]);

  //axes functions construction
  var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format('%b')).ticks(ds.monthlySales.length - 1);

  var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(4);

  //creates the svg on the page
  //the way the transition and the redraw work makes it look a little funky ... fix that
  var svg = d3.select('body').select('#svg-' + ds.category)
    .transition()
    .duration(1000)
    .ease('linear');

  //constructs the line from data
  var lineFunction = d3.svg.line()
    .x(function(d) {return xScale(getDate(d.month));})
    .y(function(d) {return yScale(d.sales);})
    .interpolate('linear');

  //draw the axes
  var xAxis = svg.selectAll('g.x-axis').call(xAxisGen);

  var yAxis = svg.selectAll('g.y-axis').call(yAxisGen);

  //draw the line
  var viz = svg.selectAll('.path-' + ds.category)
    .attr({
      //pass in data
      d: lineFunction(ds.monthlySales)
    });
}

//retrieves data and calls functions
d3.json("https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json", function(err, data) {
  if (err) {console.log(err);}
  if (data) {console.log(data);}

  var decodedData = JSON.parse(window.atob(data.content));

  for (var i = 0; i < decodedData.contents.length; i++) {
    showHeader(decodedData.contents[i]);
    buildLine(decodedData.contents[i]);
  }

  d3.select('select')
    .on('change', function(d, i) {
      var sel = d3.select('#date-option').node().value;

      var decodedData = JSON.parse(window.atob(data.content));

      // console.log(decodedData);
      // for (var i = 0; i < decodedData.contents.length; i++) {
      //   decodedData.monthlySales.splice(0, decodedData.monthlySales.lenght-sel);
      //   updateLine(decodedData.contents[i]);
      // }

      //working on converting this into a native for loop above
      decodedData.contents.forEach(function(ds) {
        ds.monthlySales.splice(0,ds.monthlySales.length-sel);
        updateLine(ds);
      });

    });
});
