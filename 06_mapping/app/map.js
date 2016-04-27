var w = 500;
var h = 300;

var path = d3.geo.path()

var svg = d3.select('body').append('svg').attr({width:w, height:h});

d3.json('us.json', function(json) {
  svg.selectAll('path')
  .data(json.features)
  .enter()
  .append('path')
  .attr('d', path)
  .attr('fill', '#666666');
});
