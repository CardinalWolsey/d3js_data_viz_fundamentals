var w = 300;
var h = 100;
var padding = 2;
var dataset = [5, 10, 15, 20, 25, 7, 32, 25];
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
    fill: function(d) {return colorPicker(d);}
  })
  //tooltip
  .on('mouseover', function(d) {
    svg.append('text')
      .text(d)
      .attr({
        'text-anchor': 'middle',
        //this is complicated ... look up what it means and how it works
        x: parseFloat(d3.select(this).attr('x')) + parseFloat(d3.select(this).attr('width') / 2),
        y: parseFloat(d3.select(this).attr('y')) + 12,
        'font-family': 'sans-serif',
        'font-size': 12,
        'fill': '#ffffff',
        id: 'tooltip'
      });
  })

  //remove tooltip
  .on('mouseout', function() {
    d3.select('#tooltip').remove();
  });
