 // load data
 d3.csv("./gapminder.csv").then(function(data) {
    // console.log(data)


    // set height, width and margin of #chart

const height= 500
const width= 500

// this did not work for me
//     const width = document.querySelector("#chart").clientWidth;
// const height = document.querySelector("#chart").clientHeight;
const margin = {top: 50, left: 100, right: 50, bottom: 100};


// append svg withing #chart
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


    // filter data
    let filtered_data = data.filter(function(r) {
    return r.year === '2007';
    
});

// set min and max values for gdp
const gdpPercap = {
    min: d3.min(filtered_data, function(d) { return +d.gdpPercap; }),
    max: d3.max(filtered_data, function(d) { return +d.gdpPercap; })
};
// console.log(gdpPercap)


// set min and max values for lifeExp
const lifeExp = {
    min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
    max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
};

// min and max values for population
const pop = {
    min: d3.min(filtered_data, function(d) { return +d.pop; }),
    max: d3.max(filtered_data, function(d) { return +d.pop; })
};

// scales
const xScale = d3.scaleLinear()
    .domain([gdpPercap.min, gdpPercap.max])
    .range([margin.left, width-margin.right]);

const yScale = d3.scaleLinear()
    .domain([0, lifeExp.max])
    .range([height-margin.bottom, margin.top]);

const rScale = d3.scaleSqrt()
    .domain([pop.min, pop.max])
    .range([1, 15]);

const fillScale = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
    .range(['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e']);

// x and y axis
    const xAxis = svg.append("g")
    .attr("class","axis")
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));

const yAxis = svg.append("g")
    .attr("class","axis")
    .attr("transform", `translate(${margin.left},0)`)
    .style("stroke", "black")
    .call(d3.axisLeft().scale(yScale));

// points
    const points = svg.selectAll("circle")
    .data(filtered_data)
    .enter()
    .append("circle")
        .attr("cx", function(d) { return xScale(d.gdpPercap); })
        .attr("cy", function(d) { return yScale(d.lifeExp); })
        .attr("r", function(d) { return rScale(d.pop); })
        .attr("fill", function(d) { return fillScale(d.continent); });

// axis labels
        const xAxisLabel = svg.append("text")
    .attr("class","axisLabel")
    .attr("x", width/2)
    .attr("y", height-margin.bottom/2)
    .text("GDP per Capita");

const yAxisLabel = svg.append("text")
    .attr("class","axisLabel")
    .attr("transform","rotate(-90)")
    .attr("x",-height/2)
    .attr("y",margin.left/2)
    .text("Life Expectancy (Years)");

});
