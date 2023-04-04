
const width = window.innerWidth,height = window.innerHeight;

d3.select("#ocean")
  .attr("width", width)
  .attr("height", height);

const svg = d3.select("#viz")
  .attr("width", width)
  .attr("height", height);

const url = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json';


Promise.all([
  d3.json(url),
  d3.json("foster.json")
]).then(function([json, data]) {
  // code to bind data to map features goes here

// Fetch the GeoJSON file using d3.json()
// d3.json(url)
//   .then(function(json) {
//     json.features = json.features.filter(function(d) {
//       return d.id !== "72";
//     });
//     d3.json("foster.json"). then(function(data){

    //   var dataMap = d3.map();
    // data.forEach(function(d) {
    //   dataMap.set(d.name, +d.total_per_cap);
    // });


// Get the minimum and maximum values of the "value" column
const [minValue, maxValue] = d3.extent(data, d => d.total_per_cap);

// Log the minimum and maximum values
console.log("Minimum value:", minValue);
console.log("Maximum value:", maxValue);


    const proj = d3.geoAlbersUsa().fitSize([width, height], json);
    const path = d3.geoPath().projection(proj);



var color = d3.scaleQuantize()
.domain([0, 100])
.range(d3.schemeBlues[5]);


    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("vector-effect", "non-scaling-stroke")
      .attr("stroke", "#FC766AFF")
      .attr("fill", "none")
      // .style("fill", function(d) { return color(d.properties.value)})
      .attr("stroke-width", "1px")
      .style("position", "absolute")
      .style("fill", function(d) {
        // find the matching row in the data
        const row = data.find(row => row.region_id === d.properties.region_id);
        
        // use the data value to set the fill color
        return colorScale(row.data_value);
      })
      // .style("z-index", 10);
  .catch(function(error) {
    console.error('Error fetching JSON file:', error);
});
});