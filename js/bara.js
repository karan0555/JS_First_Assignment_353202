var margin = {top: 20, right: 20, bottom: 30, left: 40},
 width = 800 - margin.left - margin.right,
 height = 400 - margin.top - margin.bottom;

console.log("Margin set ");

var x = d3.scale.ordinal()
 .rangeRoundBands([0, width], .2);

console.log("X "+x);
var y = d3.scale.linear()
 .range([height, 0]);

var xAxis = d3.svg.axis()
 .scale(x)
 .orient("bottom");

var yAxis = d3.svg.axis()
 .scale(y)
 .orient("left")
 .ticks(10);

var svg = d3.select("body").append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
.append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("./../json/part2.json", function(error, data) {
if (error) throw error;

x.domain(data.map(function(d) { return d["Country Name"]; }));
y.domain([0, d3.max(data, function(d) { return d["Population (Millions) - 2013"]; })]);

svg.append("g")
   .attr("class", "x axis")
   .attr("transform", "translate(0," + height + ")")
   .call(xAxis)
   .selectAll("text")
  .attr("dx", "0em")
  .attr("dy", "0")
  .attr("transform", "rotate(-90)" )
  .append("text")
   .attr("transform", "translate(" + width + "0)")
   .text("Country Name");

svg.append("g")
   .attr("class", "y axis")
   .call(yAxis)
   .append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 6)
   .attr("dy", ".1em")
   .style("text-anchor", "end")
   .text("Population");

svg.selectAll(".bar")
   .data(data)
 .enter().append("rect")
   .attr("class", "bar")
   .attr("x", function(d) { return x(d["Country Name"]); })
   .attr("width", x.rangeBand())
   .attr("y", function(d) { return y(d["Population (Millions) - 2013"]); })
   .attr("height", function(d) { return height - y(d["Population (Millions) - 2013"]); });
});

function type(d) {
d["Population (Millions) - 2013"] = +d["Population (Millions) - 2013"];
return d;
}
