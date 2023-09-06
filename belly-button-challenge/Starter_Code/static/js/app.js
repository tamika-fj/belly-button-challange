// save the URL as a constant variable 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Use the D3 library to read in samples.json
d3.json(url,function(data) {
    console.log(data)
});

//Initialise the page 
function init() {

    //select the dropdown menu using D3
    let dropdownMenu = d3.select("#selDataset");

    //Get names from json data using d3
    d3.json(url).then((data) => {

        //set up data variable 
        let names = data.names;

        //add sample ids to dropdown 
        names.forEach((id) => {

     // loop through id data to save to dropdown menu
        console.log(id);

        dropdownMenu.append("option").text(id).property("value",id);
    });


    // call the functions to display the data and the plots to the page
       let sample_one = names[0];
    
    // print value of id one
        console.log(sample_one);

    //Build the default plots 
    BuildBarChart(sample_one);
    BuildBubbleChart(sample_one);
    BuildMetaData(sample_one);
    });
};


    // create a bar chart 
    function BuildBarChart(sample) {
        d3.json(url).then((data) => {

            //collect sample data 
            let sampleData = data.samples;
    
            //collect data for chosen sample 
            let value = sampleData.filter(resultData => resultData.id == sample);

            //collect information from first sample 
            let selectedValue = value[0];

            

            // Get all otu_ids, lables, and sample values
            let barLabels = selectedValue.otu_ids;
            let barHoverText = selectedValue.otu_labels;
            let barValues = selectedValue.sample_values;


            // Log the data to the console
            console.log(barValues,barLabels,barHoverText);

        // Set top ten items to display in descending order
            let top10Labels = barLabels.slice(0,10).map(id => `OTU ${id}`).reverse();
            let top10Values = barValues.slice(0,10).reverse();
            let top10HoverText = barHoverText.slice(0,10).reverse();

    

            //create trace for barchart 
            let trace = {
                x: top10Values,
                y: top10Labels,
                text: top10HoverText,
                type: "bar",
                orientation: "h"
            };

            //set up layout 
            let layout = {
                height: 600,
                width: 800,
                title: "Top 10 OTU's from individual id"
              };

        //plot bar chart
        Plotly.newPlot("bar", [trace], layout);
      });
    };


 // create a bubble chart 
 function BuildBubbleChart(sample) {
    d3.json(url).then((data) => {

        //collect sample data 
        let sampleData = data.samples;

        //collect data for chosen sample 
        let value = sampleData.filter(resultData => resultData.id == sample);

        //collect information from first sample 
        let selectedValue = value[0];

        

        // Get all otu_ids, lables, and sample values
        let bubbleLabels = selectedValue.otu_ids;
        let bubbleHoverText = selectedValue.otu_labels;
        let bubbleValues = selectedValue.sample_values;


        // Log the data to the console
        console.log(bubbleValues,bubbleLabels,bubbleHoverText);

    



        //create trace for barchart 
        let bubbleTrace = {
            x: bubbleLabels,
            y: bubbleValues,
            text: bubbleHoverText,
            mode: "markers",
            marker: {
                size: bubbleValues,
                color: bubbleLabels,
                colorscale: "Electric"
            }
        };

        //set up layout 
        let bubblelayout = {
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: {title: "OTU ID"}
          };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [bubbleTrace], bubblelayout)
    });
};

// create metadata chart 
function BuildMetaData(sample) {
    d3.json(url).then((data) => {

//collect metadata 
let metaData = data.metadata;

//collect data for chosen sample 
let value = metaData.filter(resultData => resultData.id == sample);

//collect information from first sample 
let selectedValue = value[0];

//clear data
d3.select("#sample-metadata").html("");

//add metadata to demographics panel 
Object.entries(selectedValue).forEach(([key,value]) => {

//log metadata
console.log(key,value);

//add metadata to demographics panel 
d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`);
        });
    });
};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    BuildBarChart(value);
    BuildBubbleChart(value);
    BuildMetaData(value);
};

init();