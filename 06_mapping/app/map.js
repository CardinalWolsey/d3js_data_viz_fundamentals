//TODO: Something is up with the color and the calculation for the chloropleth
//TODO: fix nested for loop

var w = 500;
var h = 300;

var projection = d3.geo.albersUsa()
  .translate([w/2, h/2])
  .scale([500]);

var path = d3.geo.path().projection(projection);

var color = d3.scale.linear()
  .range(['#d73027','#f46d43','#fdae61','#fee090','#e0f3f8','#abd9e9','#74add1','#4575b4'])

var svg = d3.select('body').append('svg').attr({width:w, height:h});

d3.csv('state_sales.csv', function(data) {
  color.domain([0, d3.max(data, function(d) {return d.sales;})]);
  d3.json('us.json', function(json) {

    //I'm sure there is a better way to do this ... figure it out
    for (var i = 0; i < data.length; i++) {
      var salesSate = data[i].state;
      var salesVal = parseFloat(data[i].sales)

      for (var j = 0; j < json.features.length; j++) {
        var usSate = json.features[j].properties.NAME;

        if (salesSate === usSate) {
          json.features[j].properties.value = salesVal;
          break;
        }
      }
    }

    svg.selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', function(d) {
      var value = d.properties.value
      if (value) {
        return color(value)
      } else { return "#666666"}
    });
  });
});
