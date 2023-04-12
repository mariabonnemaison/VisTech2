const width = window.innerWidth,height = window.innerHeight;

// d3.select("#ocean")
//   .attr("width", width)
//   .attr("height", height);

const svg = d3.select("#viz")
  .attr("width", width)
  .attr("height", height);

  var num= 5;

// const url = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json';
const url =  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"




Promise.all([
  d3.json(url),
  d3.json("foster.json")
])

.then(function([json, data]) {
  // code to bind data to map features goes here

// Fetch the GeoJSON file using d3.json()
// d3.json(url)
//   .then(function(json) {
  //   json.features = json.features.filter(function(d) {
  //     return d.id !== "72";
  //  });

  //  data.features = data.features.filter(function(d){
  //   return d.location !== "Puerto Rico";
  //  });

  // //  console.log(json)
  //  console.log(data)
   
//     d3.json("foster.json"). then(function(data){

    //   var dataMap = d3.map();
    // data.forEach(function(d) {
    //   dataMap.set(d.name, +d.total_per_cap);
    // });

    var geoJSON = topojson.feature(json, json.objects.states);
    


// Get the minimum and maximum values of the "value" column
const [minValue, maxValue] = d3.extent(data, d => d.total_per_cap);
const [hispminValue, hispmaxValue] = d3.extent(data, d => d.total_per_cap);

// console.log("Minimum value:", hispminValue);
// console.log("Maximum value:",hispmaxValue);



// Log the minimum and maximum values
// console.log("Minimum value:", minValue);
// console.log("Maximum value:", maxValue);


const proj = d3.geoAlbersUsa().fitSize([width, height], geoJSON);
const path = d3.geoPath().projection(proj);



// Method 1: merge data before loading
var mergedData = geoJSON.features.map(function(d) {
  var csvRow = data.find(function(row) {
    return row.location === d.properties.name; // match on ID or another property
  });
  d.properties.total_per_cap = csvRow ? +csvRow.total_per_cap : null; // add data value to GeoJSON property
  return d;
});

console.log(mergedData)

// const colorScale = d3.scaleSequential()
// .domain(d3.extent(data, d => d.total_per_cap))
// .interpolator(d3.interpolateviridis);

var range = ["#ffffcc", "#225ea8"];

var colorScale = d3.scaleLog()
.domain(d3.extent(data, d => d.total_per_cap))
    .range(["#ffffcc",
    "#990000"]);




//   var colorScale = d3.scaleSequential()
//   .domain([minValue, maxValue])
//  .interpolator(d3.interpolateViridis);

 var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  // .style("position", "absolute");

  function mouseover(event, d) {
    tooltip.transition()
      .duration(200)
      .style("opacity", .9)
    tooltip.html(d.properties.name + ": " + d.properties.total_per_cap)
      .style("left", (event.pageX ) + "px")
      .style("top", (event.pageY ) + "px")
      .style("position", "absolute");
  }
  
  // function mousemove(event) {
  //   tooltip.style("left", (event.pageX ) + "px")
  //     .style("top", (event.pageY) + "px");
  // }

  function mouseout() {
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  }




    svg.selectAll("path")
    .data(mergedData)
      // .data(geoJSON.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("vector-effect", "non-scaling-stroke")
      .attr("stroke", "black")
      .attr("stroke-width", "0.5px")
      .style("position", "absolute")
      .style("fill", d => colorScale(d.properties.total_per_cap))
      .on("mouseover", mouseover)
      // .on("mousemove",mousemove)
      .on("mouseout", mouseout)
      // .on("mouseover", function(d) {
      //   tooltip.transition()
      //     .duration(200)
      //     .style("opacity", .9);
      //   tooltip.html(d.properties.name + ": " + d.properties.total_per_cap)
      //     .style("left", (event.pageX) + "px")
      //     .style("top", (event.pageY - 28) + "px");
      // })
      // .on("mouseout", function(d) {
      //   tooltip.transition()
      //     .duration(500)
      //     .style("opacity", 0);
      // });
      // merge data after loading
      // .style("fill", function(d) {

      //   return d.properties.his_per_cap ? colorScale(d.properties.his_per_cap) : "grey";
      // })

      //   // find the matching row in the data
      //   const row = data.find(row => row.location === d.properties.name);
        
      //   // use the data value to set the fill color
      //   return colorScale(row.his_per_cap);
       
      

});










// const width = window.innerWidth,height = window.innerHeight;

// const svg = d3.select("#viz")
//   .attr("width", width)
//   .attr("height", height);

//   var num= 5;


// const url =  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"




// Promise.all([
//   d3.json(url),
//   d3.json("foster.json")
// ])

// .then(function([json, data]) {


//     var geoJSON = topojson.feature(json, json.objects.states);
    


// const [minValue, maxValue] = d3.extent(data, d => d.total_per_cap);


// const proj = d3.geoAlbersUsa().fitSize([width, height], geoJSON);
// const path = d3.geoPath().projection(proj);




// var mergedData = geoJSON.features.map(function(d) {
//   var csvRow = data.find(function(row) {
//     return row.location === d.properties.name; 
//   });
//   d.properties.total_per_cap = csvRow ? +csvRow.total_per_cap : null; 
//   return d;
// });

// console.log(mergedData)



//   var colorScale = d3.scaleSequential()
//   .domain([minValue, maxValue])
//  .interpolator(d3.interpolateViridis);

//  var tooltip = d3.select("body")
//   .append("div")
//   .attr("class", "tooltip")
//   .style("opacity", 0)
  

//   function mouseover(event, d) {
//     tooltip.transition()
//       .duration(200)
//       .style("opacity", .9)
//     tooltip.html(d.properties.name + ": " + d.properties.total_per_cap)
//       .style("left", (event.pageX ) + "px")
//       .style("top", (event.pageY ) + "px")
//       .style("position", "absolute");
//   }
  
//   function mousemove(event) {
//     tooltip.style("left", (event.pageX ) + "px")
//       .style("top", (event.pageY) + "px");
//   }

//   function mouseout() {
//     tooltip.transition()
//       .duration(500)
//       .style("opacity", 0);
//   }




//     svg.selectAll("path")
//     .data(mergedData)
//       .enter()
//       .append("path")
//       .attr("d", path)
//       .attr("vector-effect", "non-scaling-stroke")
//       .attr("stroke", "grey")
//       .attr("stroke-width", "0.5px")
//       .style("position", "absolute")
//       .style("fill", d => colorScale(d.properties.total_per_cap))
//       .on("mouseover", mouseover)
//       .on("mousemove",mousemove)
//       .on("mouseout", mouseout)
   
// });






