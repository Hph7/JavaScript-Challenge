// from data.js
var tableData = data;

// Level 1: Automatic Table and Date Search
// Using the UFO dataset provided in the form of an array of JavaScript objects, 
var tbody = d3.select("tbody");
// append a table to your web page and adds new rows of data for each UFO sighting.
data.forEach((ufoSighting) => {
    var row = tbody.append("tr");
    Object.entries(ufoSighting).forEach(([key,value]) => {
        var cell = row.append("td").text(value);})
})

// Level 2: Multiple Search Categories
// Select the buttons
var button = d3.select("#filter-btn");
var resetbtn = d3.select("#reset-btn");

//select the input form
var form = d3.select(".form-control")

// select the input fields
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var inputField3 = d3.select("#state");
var inputField4 = d3.select("#shape");
var inputField5 = d3.select("#country");

// Create event handlers for clicking the button or pressing enter key
button.on("click", runEnter);
form.on("submit", runEnter);

// create the function to run for both events
function runEnter(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Get the value property of the input element
    var inputDate = inputField1.property("value")
    var inputCity = inputField2.property("value")
    var inputState = inputField3.property("value")
    var inputShape = inputField4.property("value")
    var inputCountry = inputField5.property("value")

    // Filter by field matching input value
    var filterCountry = data.filter(data => data.country === inputCountry);
    console.log(filterCountry)
    var filterDate = data.filter(data => data.datetime === inputDate);
    console.log(filterDate)
    var filterCity = data.filter(data => data.city === inputCity);
    console.log(filterCity)
    var filterState = data.filter(data => data.state === inputState);
    console.log(filterState)
    var filterShape = data.filter(data => data.shape === inputShape);
    console.log(filterShape)

    var filterData = data.filter(data => data.country === inputCountry && data.datetime === inputDate && data.city === inputCity && data.state === inputState && data.shape === inputShape);
    console.log(filterData)

    // remove any children from the tbody to
    tbody.html("")

    // append data to the table
    filterData.forEach((filterData)=>{
        var row = tbody.append("tr")
        Object.entries(filterData).forEach(([k, v])=>{
            var filtercell = row.append("td").text(v);
        })
    })

    // if no data is available for the chosen filter write "No results found"
    if (filterData.length === 0) {tbody.append("tr").append("td").text("No results found!")}

    // reset button removes any children from the tbody and populates the unfiltered data
    resetbtn.on("click", () => {
        tbody.html("");
        data.forEach(ufoSighting => {
            var row = tbody.append("tr");
            Object.entries(ufoSighting).forEach(([key, value])=>{
                var cell = row.append("td").text(value)
            })
        });
    })
}


