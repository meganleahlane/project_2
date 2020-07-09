// function create_chart(sampleID){
//     d3.csv ("All_Years_CPS.csv").then(data)=>{}
// }
let rawData;

function schoolChanged() {
    var selectedSchoolData = rawData.filter((school) => school.short_name === this.value);
    // selectedSchoolData.sort()

    createTable(selectedSchoolData);
}


function dropdown_data(){
    var select_dropdown = d3.select("#selDataset");
    d3.csv ("All_Years_Website_CPS.csv").then((data)=>{
        var names = data.map(row=>row.short_name);
        names.sort()
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }
        var unique_names = names.filter( onlyUnique );
        unique_names.forEach((sample)=>{
            select_dropdown.append("option") 
            .text(sample)
            .property("value", sample);
        });
        // select_dropdown.sort()
        rawData = data;
        select_dropdown.on("change", schoolChanged);

        //createTable(rawData);
        // var first_sample = names[0];
        // school_data(first_sample);
        // create_chart(first_sample);
        // create_table(first_sample);
    });
}

function createTable(data) {
    const columnMap = {
        "year": "Year",
        "short_name": "School Name",
        "address": "Address",
        "city": "City",
        "state":"State",
        "zip":"Zip Code",
        "school_type": "School Type",
        "primary_category":"Primary Category",
        "phone":"Phone Number",
        "website":"Website"
 };
    const schoolTable = d3.select("#school-table");

    // grab first element for column headers
    var first = data[0];
    var columns = Object.keys(first);

    const headerRow = schoolTable.select("thead tr");
    headerRow.html('');
    columns.forEach(
        function(column) {
            if(columnMap[column]) {
                headerRow.append("td").text(columnMap[column]);
            }
        }
    );

    //to help navigating all school websites 

    var tableBody = schoolTable.select("tbody");
    tableBody.html('');
    data.forEach(
        function(school) {
            var row = tableBody.append("tr");

            for (let [key, value] of Object.entries(school)) {
                if(columnMap[key]) {
                    // key = "website"
                    // value = "https://someschool.org"
                    var cell = row.append("td");
                    if(key == "website") {
                        value = `<a href="${value}" target="_blank">${value}</a>`;
                        cell.html(value);
                    }
                    else {
                        cell.text(value);
                    }
                }
            }
        }
    );
}

//d3.csv("All_Years_CPS.csv").then(
    //d3.csv("All_Years_Website_CPS.csv").then(
    //function(data) {
        //rawData = data;
        //createTable(rawData);
    //}
//);
// function(school) { 
//     // determine selected type
//     alert(school);
//     // run rawData.filter() for that type

//     // pass filtered results into createTable()
// });

d3.select("#name-input").on("change", function() {
    // same-ish as above
});

dropdown_data();

function dummyFilter() {
    var filtered = rawData.filter(school => school.city != "Chicago");
    createTable(filtered);
}


