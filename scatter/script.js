/*
QUESTION 1:

Examine the d3.csv().then() pattern below
and discuss the following questions:
    - What is the "./data/gapminder.csv" inside of
        inside of the parentheses for d3.csv()
        referring to?

    ANSWER: This is referencing the folder location and file name of our data source. 
    This way d3.csv knows where to extract the csv file to load into our script.


    - What is the parameter named `data` inside of
        the function expression within .then()
        referring to?

        ANSWER: data inside of the .then() is a callback from the promise argument that we can use to reference later on in our code.


    - What kind of JS data structure is `data`?

     ANSWER:'data' in this case is an array of objects.

    - Where does the entire d3.csv().then() pattern
        open and close in this document?


        ANSWER: d3.csv().then opens with a .then (function(data) {  on line  40 and closes with }); on line 246         

    You may find it useful to examine the contents
    of `data` with console.log(data)

*/



d3.csv("./gapminder.csv").then(function(data) {

    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS

    QUESTION 2:
        - What is document.querySelector("#chart") doing?
        - `clientWidth` and `clientHeight` are properties of
            elements in the DOM (Document Object Model).
            What do these properties measure?

         ANSWER: document.querySelector(#chart) returns the element with id #chart.
        clientWidth and clientHeight measure the width and height in pixels of the element.



    */

    var width=document.querySelector("#chart").clientWidth;
    var height=600;

// these const did not work for me

    // const width = document.querySelector("#chart").clientWidth;
    // const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 50, left: 100, right: 50, bottom: 100};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    /* FILTER THE DATA 
    
    This data set is large and includes data from multiple years.

    Let's filter the data to only select data for the year 2007,
    and then subsequently use that year's data to draw the scatter plot.

    To filter the data, we can use the .filter() method for arrays.

    QUESTION 3:

    `.filter()` is a JavaScript array method.
    - What does this method do/how does this method work?
        (What do we get back from using this method?)

        ANSWER: .filter() functions filters the dataset according to the attributes that set for it filter by. In this instance the function will filter the data that contains year 2007. 
        
    - Inside the parentheses for .filter(), there is
        a function expression with a parameter
        named `d`. What is `d` a reference to?


         ANSWER: 'd' is referencing the data that we will filter.

    - Does that parameter *have to be* named `d`?
        Can it be named something else?

         ANSWER: This parameter can be named anything else, all it does is tell us how to access the current data element

    - What is the purpose of the statement inside
        the function expression? What is this doing?
        return d.year === '2007';

        ANSWER: this statement is saying that when filtering the data, the function should return from the d(the data) the array labelebed

    - Why are we storing the result of data.filter(...)
        inside a variable (filtered_data)?

        ANSWER: We are storing it inside a variable so its easier to reference later, to visualize this specific piece of data.

    */

    let filtered_data = data.filter(function(d) {
        return d.year === '2007';
    });


    /*
    DETERMINE MIN AND MAX VALUES OF VARIABLES

    In the following section, we'll use the methods d3.min() and d3.max()
    to calculate minimum and maximum values of the variables in our data set.

    Note that to keep things clean, we're organizing the minimum and maximum
    values inside of objects, and storing those min/max values in properties
    named inside those objects. This helps make it easier to refer to these
    values later in our code.


    QUESTION 4:
        - What does d3.min() do? What does d3.max() do?
            What are the 2 arguments we supply to d3.min()/d3.max()?

            ANSWER: d3.min() and d3.max() set the minimum and maximum variables of the variables in the data.

        - In the second argument for both d3.min() and d3.max(),
            the function expression has a parameter named `d`.
            What is `d` a reference to?

            ANSWER:  'd' is the parameter that allows us to  access the current dataset.

        
        - Why is there a plus sign (+) in front of d.gdpPercap,
            d.lifeExp, and d.pop?

            ANSWER:  The plus sign converts the string into a positive number, so it can be recognized as an integer.



    */

    const gdpPercap = {
        min: d3.min(filtered_data, function(d) { return +d.gdpPercap; }),
        max: d3.max(filtered_data, function(d) { return +d.gdpPercap; })
    };

    const lifeExp = {
        min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
        max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
    };

    const pop = {
        min: d3.min(filtered_data, function(d) { return +d.pop; }),
        max: d3.max(filtered_data, function(d) { return +d.pop; })
    };



    /*
    CREATE SCALES

    We'll use the computed min and max values to create scales for
    our scatter plot.

    QUESTION 5:
        - What does d3.scaleLinear() do?

       ANSWER: d3.scaleLinear() creates a linear scale, in this case for the x and y variables.

        - What does d3.scaleSqrt() do?

    ANSWER: d3.scaleSqrt() create a square root scale, which allows us to map the data value to the circle's area. The area of a circle is calcultaed by A=πR^2.
 
        - What does d3.scaleOrdinal() do?

        ANSWER: scaleOrdinal() creates an ordinal scale where we can set the domain and range. 

        - For each scale below, what does the domain
            represent, and what does the range represent?
            
            ANSWER: 
            For xScale, the domain represents the set of values on the x axis, the range represents the span of our axis in pixels.
            For yScale, the domain represents the set of values on the y scale from 0 to the max of lifeExp, the range represents the span of the domain in pixels. In other words, where the values will sit on the axis.
            For rScale, the domain is the set of values for population, and the range is the area of the circles according to the values on the domain.
            For fillScale, the domain is the set of values, in this case strings, that indicate the continent. The range is the color that represents each continent.

        - For each scale below, how many values are in
            the domain and range?



    */

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


    /*
    DRAW AXES

    QUESTION 6:
    
    The following chunks of code draw 2 axes -- an x- an y-axis.
        - What is the purpose of the "g" element being appended?
       
        ANSWER:  the 'g' element is a container that allows us to  group svg elements together, in this case the x and y axis.

        - What is the purpose of the "transform" attribute being defined?
        ANSWER:  The transform attribute sets the location and length of the axis.

        - What do the d3.axisBottom() and d3.axisLeft() methods do?

        ANSWER:  d3.axisbottom() creates an axis on the bottom of the graph, while axisLeft places the axis to the left of the graph elements.

    */
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));


    /*
    DRAW POINTS

    In this scatter plot, each circle will represent a single country;
    the horizontal position of the circle will represent GDP per capita,
    vertical position will represent life expectancy, color will represent
    continent, and radius will represent population

    QUESTION 7:

    The following chunk of code is the standard D3 data join pattern.
        - What is the purpose of the pattern svg.selectAll().data().enter().append()?

 ANSWER: The pattern sets up an enter update exit process to visualize the data. .data(filtered_data) indicates where the data is coming from and .enter() loads the data into the svg circles.

        - Each attribute defined below is defined using things called
            "accessor functions." In each accessor function, what is
            the parameter named `d` a reference to?
 ANSWER: 'd' is referencing the current dataset. the function is saying that from the current data, return xScale for gdpPercap.

        - Inside each accessor function, what is the purpose of
            each "return ___;" statement?
 ANSWER: the return statements for the first .attr is requesting the function to return gdpPercap using the xScale. The same applies to the other attributes and their respective scales.


    */
    const points = svg.selectAll("circle")
        .data(filtered_data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.gdpPercap); })
            .attr("cy", function(d) { return yScale(d.lifeExp); })
            .attr("r", function(d) { return rScale(d.pop); })
            .attr("fill", function(d) { return fillScale(d.continent); });
    
    /*
    DRAW AXIS LABELS

    QUESTION 8:

    The chunks of code below draw text labels for the axes.

    Examine the yAxisLabel. What is going on with the 
    "transform", "x", and "y" attributes, in terms of
    how their values are computed to control the rotated
    placement of the label?

    ANSWER: the attributes are stating where the text will be loacted in refernce to the axis elements. for intance the xAxisLabel will be positioned at the half of the width that we set previously.

    */
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


    const tooltip=d3.select('#chart')
        .append('div')
        .attr('class','tooltip');

    points.on("mouseover", function(e,d){

        console.log("In here");

        let x=+d3.select(this).attr('cx');
        let y=+d3.select(this).attr('cy');

        let displayValue = d3.format(',')(d.pop);

        tooltip.style("visibility", "visible")
            .style("top",`${y}px`)
            .style("left",`${x}px`)
            .html(`<p><b>${d.country}</b><br><em>${d.continent}</em></br>${displayValue}</p>`);

    }).on("mouseout", function(){

        tooltip.style("visibility", "hidden");

    });

    const legendHeight= 150;
    const legendWidth= document.querySelector("#legend").clientWidth;
    const legendSpacing=100;
    const legendMargin=20;

    const colorLegend = d3.select("#legend")
        .append("svg")
        .attr("height", legendHeight)
        .attr("width", legendWidth)
        .attr("stroke","black")
        .attr("fill","white")

    const continents = ["Asia", "Europe", "Africa", "Americas", "Oceania"]
    
    continents.forEach (function(continents, i){
        
        colorLegend.append ("circle")
        .attr("cx", 30 + legendMargin + i*legendSpacing)
        .attr("cy", legendMargin)
        .attr("r", 10)
        .attr("fill", fillScale(continents));

        colorLegend.append("text")
        .attr("class", "legend--label")
            .attr("x", 30 + legendMargin + i*legendSpacing)
            .attr("y", legendMargin +25 )
            .text(continents)

    });
    const allCategories= data.map(function(d){
        return d.continent;
    })
 console.log(allCategories)

const uniqueCategories= [...new Set(allCategories)];
console.log(uniqueCategories)

});
