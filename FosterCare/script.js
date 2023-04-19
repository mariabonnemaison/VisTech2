const width = window.innerWidth, height = window.innerHeight;



const svg = d3.select("#viz")
  .attr("width", width)
  .attr("height", height);

var num = 5;


const url = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"



Promise.all([
  d3.json(url),
  d3.json("foster.json")
])

  .then(function ([json, data]) {

    var geoJSON = topojson.feature(json, json.objects.states);

    const proj = d3.geoAlbersUsa().fitSize([width, height], geoJSON);
    const path = d3.geoPath().projection(proj);



    // Method 1: merge data before loading
    var total = geoJSON.features.map(function (d) {
      var csvRow = data.find(function (row) {
        return row.location === d.properties.name; // match on ID or another property
      });

      d.properties.total_per_cap_under18 = csvRow ? + csvRow.total_per_cap_under18 : null;

      d.properties.his_per_cap_under18 = csvRow ? + csvRow.his_per_cap_under18 : null;

      d.properties.wh_cap_under18 = csvRow ? + csvRow.wh_cap_under18 : null;

      d.properties.bl_cap_under18 = csvRow ? + csvRow.bl_cap_under18 : null;

      d.properties.ai_per_cap_under18 = csvRow ? + csvRow.ai_per_cap_under18 : null;
      return d;
    });
    // add data value to GeoJSON property

    console.log(total)



    var colorScale = d3.scaleLog()
      .domain(d3.extent(data, d => d.total_per_cap_under18))
      .range(["#ffffcc",
        "#990000"]);

        var formatNumber = d3.format(".0f");



    var tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
    // .style("position", "absolute");

    // function mouseover(event, d) {
    //   tooltip.transition()
    //     .duration(200)
    //     .style("opacity", .9)
    //   tooltip.html(d.properties.name + ": " + formatNumber(d.properties.total_per_cap_under18))
    //     .style("left", (event.pageX) + "px")
    //     .style("top", (event.pageY) + "px")
    //     .style("position", "absolute");
    // }

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
      .data(total)
      // .data(geoJSON.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("vector-effect", "non-scaling-stroke")
      .attr("stroke", "black")
      .attr("stroke-width", "0.5px")
      .style("position", "absolute")
      .style("fill", d => colorScale(d.properties.total_per_cap_under18))
    .on("mouseover", function(event, d){
        tooltip.transition()
          .duration(200)
          .style("opacity", .9)
        tooltip.html(d.properties.name + ": " + formatNumber(d.properties.total_per_cap_under18))
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY) + "px")
          .style("position", "absolute");
      })
      .on("mouseout", mouseout)
      
     const title= svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 20)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text("Number of Children in Foster Care per State")

    



// ***** BUTTONS*****


    // Hispanic under 18
    const buttonContainer = d3.select("#button-container");
    const button1 = buttonContainer.append("button")
      .attr("id", "button")
      .text("Hispanic");
    button1.on("click", function () {
      title.text("Hispanic Children in Foster Care");

      tooltip
      .html("New tooltip text for button 1");

      var newcolorScale = d3.scaleLog()
        .domain(d3.extent(data, d => d.his_per_cap_under18))
        .range(["#ffffcc", "#990000"]);


      let b = svg.selectAll("path")
        .data(total)

      b.enter()
        .append("path")
        .attr("d", path)
        .attr("vector-effect", "non-scaling-stroke")
        .attr("stroke", "black")
        .attr("stroke-width", "0.5px")
        .style("position", "absolute")
        // .style("fill", d => colorScale(d.properties.total_per_cap_under18))
        // .on("mouseover", mouseover)
        //  .on("mouseout", mouseout)
        .merge(b)
        .transition() // a transition makes the changes visible...
        .duration(1500)
        .style("fill", d => newcolorScale(d.properties.his_per_cap_under18))
    
    });


    // Black under 18
    const button2 = buttonContainer.append("button")
      .attr("id", "button")
      .text("Black");
    button2.on("click", function () {

      title.text("Black Children in Foster Care");

      function mouseout() {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      }

      var blcolorScale = d3.scaleLog()
        .domain(d3.extent(data, d => d.bl_cap_under18))
        .range(["#ffffcc", "#990000"]);


      let b = svg.selectAll("path")
        .data(total)

      b.enter()
        .append("path")
        .attr("d", path)
        .attr("vector-effect", "non-scaling-stroke")
        .attr("stroke", "black")
        .attr("stroke-width", "0.5px")
        .style("position", "absolute")
        // .style("fill", d => colorScale(d.properties.total_per_cap_under18))
        // .on("mouseover", mouseover)
        // .on("mouseout", mouseout)
        .merge(b)
        .transition() // a transition makes the changes visible...
        .duration(1500)
        .style("fill", d => blcolorScale(d.properties.bl_cap_under18))
        // .on("mouseover", mouseover)
        
    });



    const button3 = buttonContainer.append("button")
      .attr("id", "button")
      .text("American Indian");
    button3.on("click", function () {

      title.text("American Indian Children in Foster Care");


     
      var aicolorScale = d3.scaleLog()
        .domain(d3.extent(data, d => d.ai_per_cap_under18))
        .range(["#ffffcc", "#990000"]);


      let b = svg.selectAll("path")
        .data(total)

      b.enter()
        .append("path")
        .attr("d", path)
        .attr("vector-effect", "non-scaling-stroke")
        .attr("stroke", "black")
        .attr("stroke-width", "0.5px")
        .style("position", "absolute")
        // .style("fill", d => colorScale(d.properties.total_per_cap_under18))
        // .on("mouseover", mouseover)
        // .on("mouseout", mouseout)
        .merge(b)
        .transition() // a transition makes the changes visible...
        .duration(1500)
        .style("fill", d => aicolorScale(d.properties.ai_per_cap_under18))
        // .on("mouseover", mouseover)
       
      
    });


    const button4 = buttonContainer.append("button")
      .attr("id", "button")
      .text("White");
    button4.on("click", function () {

 title.text("White Children in Foster Care");


      var whcolorScale = d3.scaleLog()
        .domain(d3.extent(data, d => d.wh_cap_under18))
        .range(["#ffffcc", "#990000"]);


      let b = svg.selectAll("path")
        .data(total)

      b.enter()
        .append("path")
        .attr("d", path)
        .attr("vector-effect", "non-scaling-stroke")
        .attr("stroke", "black")
        .attr("stroke-width", "0.5px")
        .style("position", "absolute")
        // .style("fill", d => colorScale(d.properties.total_per_cap_under18))
        // .on("mouseover", mouseover)
        // .on("mouseout", mouseout)
        .merge(b)
        .transition() // a transition makes the changes visible...
        .duration(1500)
        .style("fill", d => whcolorScale(d.properties.wh_cap_under18))
        // .on("mouseover", mouseover)
      
    });


    const button5 = buttonContainer.append("button")
      .attr("id", "button")
      .text("Total");
    button5.on("click", function () {

      title.text("All Children in Foster Care per Capita")

   
      
      var whcolorScale = d3.scaleLog()
        .domain(d3.extent(data, d => d.total_per_cap_under18))
        .range(["#ffffcc", "#990000"]);


      let b = svg.selectAll("path")
        .data(total)

      b.enter()
        .append("path")
        .attr("d", path)
        .attr("vector-effect", "non-scaling-stroke")
        .attr("stroke", "black")
        .attr("stroke-width", "0.5px")
        .style("position", "absolute")
        // .style("fill", d => colorScale(d.properties.total_per_cap_under18))
        // .on("mouseover", mouseover)
        // .on("mouseout", mouseout)
        .merge(b)
        .transition() // a transition makes the changes visible...
        .duration(1500)
      .style("fill", d => whcolorScale(d.properties.total_per_cap_under18))
        
      
    });
  });

  
  
// ***** BAR CHART*****

const margin = {top: 20, right: 10, bottom: 40, left: 200};
const barwidth = 700 - margin.left - margin.right;
const barheight = 400 - margin.top - margin.bottom;

  
  const bar = d3
    .select("#bars")
    .attr("width", barwidth + margin.left + margin.right)
    .attr("height", barheight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
;
  
  const barData = [
    { category: "Total", value: 42491.27266 },
    { category: "White", value: 19328.70231 },
    { category: "Black", value: 7906.229332 },
    { category: "Hispanic", value: 7774.273877 },
    { category: "American Indian", value: 2626.491372 },
  ];
  
  console.log(barData);
  
  let x = d3
    .scaleLinear()
    .domain([0, d3.max(barData, (d) => d.value)])
    .range([0, barwidth])

  
    bar.append("g")
    .attr("transform", `translate(0, ${barheight})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("color", "black");
  
  let y = d3
    .scaleBand()
    .range([0, barheight])
    .domain(barData.map((d) => d.category))
    .padding(0.1);
  
  bar.append("g")
  .call(d3.axisLeft(y));
  
  bar
    .selectAll("rect")
    .data(barData)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(d.category))
    .attr("width", (d) => x(d.value))
    .attr("height", y.bandwidth())
    .attr("fill", "#75151E");

    bar.append("text")
    .attr("x", (barwidth / 2))             
    .attr("y", margin.top -20)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text("Number of Children in Foster Care by Race (Per Capita)");
  













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






