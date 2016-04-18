var w = 300;
var h = 100;
var padding = 2;
var dataset = [5, 10, 15, 20, 25];
svg = d3.select('body').append('svg').attr('width', w).attr('height', h);

function colorPicker(v) {
  if(v<=20) {return '#666666';}
  if(v>20) {return '#FF0033';}
}

svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr({
      x: function(d, i) {return (i * (w/dataset.length));},
      y: function(d) {return (h-d);},
      width: (w / dataset.length - padding),
      height: function(d) {return d;},
      fill: function(d) {return 'rgb(' + (d*10) + ',0,0)';}
    });
