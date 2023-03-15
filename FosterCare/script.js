// 1. Grab the dimensions of the open window in the browser.
// Our geographical map will extend throughout the window.


const width = window.innerWidth, height = window.innerHeight;


const svg = d3.select("#viz")
            .attr("width", width)
            .attr("height", height);

const map = svg.select("#map");

d3.select("#ocean")
  .attr("width", width)
  .attr("height", height);


  var proj = d3.geoAlbersUsa().fitSize([width, height]);
  var path = d3.geoPath().projection(proj);
  

d3.json("./geojson.json").then (function(json) {


        map.selectAll("path")
            .data(json.features)
            .enter().append("path")
            // we use the "d" attribute in SVG graphics to define a path to be drawn
            // "d" is a presentation attribute, so can also be used as a CSS property
            .attr("d", path)
            .attr("fill", "#FCEDDA")
            .attr("vector-effect", "non-scaling-stroke")
            .attr("stroke", "#FC766AFF")
            .attr("stroke-width", "0.1px");
        



   
});

//      * 9. Plotting on the Geographical Map
//      * 
//      * Plot two circles on the geographical map to denote the location 
//      * of particular cities. The location of a city is given by the 
//      * coordinates for latitude and longitude. Once you get the
//      * coordinates, you use the projection function defined previously,
//      * e.g., the Mercator projection, and you pass in those coordinates
//      * in the function to project them onto the map as pixel positions.
//      */

//     // NOTE: The coordinates for a city are given as: [longitude, latitude]
//     // //       because that is how the projection function wants them.
//     // var points = [
//     //     {"name": "Boston", "coords": [-71.0589, 42.3601]},
//     //     // {"name": "London", "coords": [-0.1278, 51.5074]}
//     // ];

//     // 10. The following is a D3 join pattern for adding SVG circle shapes. 
//     //
//     // Here, notice how we transform the circles using
//     // the projection function we defined previously. Essentially, the
//     // projection is just a function that requires an input argument, 
//     // namely the coordinates of a point.

//     // We define a variable for the radius of the circles that represent our cities.
//     // We will use this variable in two different places below.

//     // var circleRadius = 4;

//     // map.selectAll("circle")
//     //     .data(points)
//     //     .enter().append("circle")
//     //     .attr("r", circleRadius)
//     //     .attr("fill", "#201E20")
//     //     .attr("transform", function(d) {
//     //         return "translate(" + proj(d.coords) + ")";
//     //     });

//     /**
//      * 11. D3 Zoom and Pan
//      * 
//      * D3 provides a method called .zoom() that adds zoom and pan behaviour to an
//      * HTML or SVG element. 
//      * 
//      * For more information, see: https://www.d3indepth.com/zoom-and-pan/
//      * 
//      * Documentation: https://github.com/d3/d3-zoom
//      */

//     // function zoomed(e) {
//     //     // The parameter `e` represents an event, that is, a zoom event.
//     //     // e.transform represents the latest zoom transform caused by a zoom event
//     //     // and it is applied to the svg map element (see the index.html).
//     //     map.attr("transform", e.transform);

//         // RESIZING Circles: 
//         // Uncomment the following lines of code to scale the circles/cities 
//         // based on how you zoom into the map.

//         // We divide our original circleRadius with the current transformation
//         // of our `map` container caused by the zooming behaviour. The attribute
//         // .k retrieves the scaling factor of the current transformation.

//         // Take a look at the documentation for D3 events to understand what 
//         // <event>.transform.k means:
//         // https://github.com/d3/d3-zoom#zoom-transforms

//     //     map.selectAll("circle")
//     //         .attr("r", function(d){
//     //             return circleRadius /e.transform.k;
//     //         });
//     // };

//     // Calling d3.zoom() creates a zoom behavior. Note, the .zoom() method 
//     // // handles both zoom and pan events.
//     // let zoom = d3.zoom()
//     //     // This essentially constraints the user so that the user can only
//     //     // zoom and pan within specific bounds, e.g., our window's width and height.
//     //     // Top-Left Point of Browser: [0, 0]
//     //     // Bottom-Right Point of Browser: [width, height]
//     //     .translateExtent([[0, 0], [width, height]])
//     //     // This constraints the extent to which you can zoom in and out.
//     //     //          [minimum scale factor, maximum scale factor]
//     //     // Experiment with different values to see the behavior of zooming.
//     //     .scaleExtent([1, 15])
//     //     // The .on() method is D3's standard event listener, like user clicks, mouseover, etc.
//     //     .on("zoom", zoomed);

//     // // Here, we allow the zoom function which controls the zoom and pan behavior to be called
//     // // into the element we selected, i.e., the svg container that holds all our visualization.
//     // // See the beginning of this file for how the variable `svg` is defined.
//     // svg.call(zoom);

// });