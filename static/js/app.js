
namesArray = [];

// populate the demographic table
function demographicData(name)
{
    // console.log(name);

    d3.json("samples.json").then((data) =>
    {       
    let metaData = data.metadata;
    // console.log(metaData);

    // filter on name to capture appropriate metadata element based on name
    let result = metaData.filter(nameOutput => nameOutput.id == name);
    let resultName = result[0];
    console.log(resultName);


    // clear out prior demographics populated each time run through
    d3.select("#sample-metadata").html("");

    // populate the demographic information, appending to
    Object.entries(resultName).forEach(([key, value]) => {
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
});
}

// build the bar graph
function buildBarChart(name)
{
    // console.log(sample)
    // let data = d3.json("samples.json");
    // console.log(data);

    d3.json("samples.json").then((data) =>
    {
    let sampleData = data.samples;
    // console.log(sampleData);

    // filter on name to capture appropriate metadata element based on name
    let result = sampleData.filter(nameOutput => nameOutput.id == name);
    let resultData = result[0];
    console.log(resultData);
    

    // grab otu ids, labels and sample values and  create series of arrays
    let otu_ids = resultData.otu_ids;
    let otu_labels = resultData.otu_labels;
    let sample_values = resultData.sample_values;
    // console.log("otu ids");
    // console.log(otu_ids);
    // console.log("otu labels");
    // console.log(otu_labels);
    // console.log("sample values");
    // console.log(sample_values);

    // build bar graph horizontally
    // get y axis values, using otu ids
    // use slice to get top 10
    let yvalues = otu_ids.slice(0,10).map(id => `OTU ${id}`);
    // console.log("y values");
    // console.log(yvalues);

    let xvalues = sample_values.slice(0,10);
    // console.log("x values");
    // console.log(xvalues);

    let textLabels = otu_labels.slice(0,10);
    // console.log("text labels");
    // console.log(textLabels);

    let barGraph = {
        y: yvalues.reverse(),
        x: xvalues.reverse(),
        text: textLabels.reverse(),
        type: "bar",
        orientation: "h"
    }

    let layout = {
        title: "Top 10 Belly Bacteria"
    }

    Plotly.newPlot("bar", [barGraph], layout);
});
}

// function to build bubble chart
function buildBubbleGraph(name)
{
// console.log(sample)
    // let data = d3.json("samples.json");
    // console.log(data);

    d3.json("samples.json").then((data) =>
    {
    let sampleData = data.samples;
    // console.log(sampleData);

    // filter on name to capture appropriate metadata element based on name
    let result = sampleData.filter(nameOutput => nameOutput.id == name);
    let resultData = result[0];
    console.log(resultData);
    

    // grab otu ids, labels and sample values and  create series of arrays
    let otu_ids = resultData.otu_ids;
    let otu_labels = resultData.otu_labels;
    let sample_values = resultData.sample_values;
    // console.log("otu ids");
    // console.log(otu_ids);
    // console.log("otu labels");
    // console.log(otu_labels);
    // console.log("sample values");
    // console.log(sample_values);

    let bubbleChart = {
        y: sample_values,
        x: otu_ids,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        }
    }

    let layout = {
        title: "Top 10 Belly Bacteria",
        hovermode: "closest",
        xaxis: {title: "OTU ID"}
    }

    Plotly.newPlot("bubble", [bubbleChart], layout);
});

}

function initialize()
    {d3.json("samples.json").then((data) =>
    {
    
    for(var i = 0; i < data.names.length; i++)
    {   row = data.names[i];
        namesArray.push(row);
    }
    console.log(namesArray)  
    
    test_first_value = data.names[data.names.length -1];
    console.log(test_first_value);

    // access the list of names for selection
    // use # in fron of selDataset since it's an id tag
    var select = d3.select("#selDataset");
    
//   grab each array item and add to the option tag

    namesArray.forEach((name) => {
        select.append("option").text(name).property("value", name);
    });

    // grab 1st observation when initialized
    let name1 = namesArray[0];

    // call on funciton to pull in metadata
    demographicData(name1);

    buildBarChart(name1);

    buildBubbleGraph(name1);

    buildGauge(name1);

 } ); // closes d3

    
         
} // closes function

// function to add data based on name selection
// use onchange to point to optionChanged function and grab the item
function optionChanged(item)
{
    // console.log(item);
    //pick up new metadata to grab
    demographicData(item);

    // call function to create bar graph
    buildBarChart(item);

    // call function to create bubble graph
    buildBubbleGraph(item);

    // call function to create bubble graph
    buildGauge(item);

}





initialize();