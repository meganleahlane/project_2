function dropdown_data(){
    var select_dropdown = d3.select("#selDataset");
    d3.csv ("data/All_Years_CPS.csv").then((data)=>{
        var names = data.map(row=>row.short_name);
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }
        var unique_names = names.filter( onlyUnique );
        unique_names.forEach((sample)=>{
            select_dropdown.append("option")
            .text(sample)
            .property("value", sample);
        });
        var first_sample = names[0];
        school_data(first_sample);
        create_chart(first_sample);
        create_table(first_sample);
        dataTable(first_sample);
        d3.selectAll("#selDataset").on("change", optionChanged);
    });
}
dropdown_data()

function dataTable(data){
    var tBody = d3.select("tbody");
    tBody.html("");
    data.forEach((datarow)=>{
        var row = tBody.append("tr");
        Object.values(datarow).forEach((value)=>{
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

let rawData;

// var something = info_array = data.filter(sample_object => sample_object.short_name == sampleID);

function create_table(data) {
    const columnMap = {
        "year": "Year",
        "student_growth_rating": "Growth",
        "student_attainment_rating": "Attainment",
        "culture_climate_rating": "Culture",
        "school_survey_safety": "Safety"
    };
    const schoolTable = d3.select("#school-table");
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
    var tableBody = schoolTable.select("tbody");
    tableBody.html('');
    data.forEach(
        function(school) {
            var row = tableBody.append("tr");
            for (const [key, value] of Object.entries(school)) {
                if(columnMap[key]) {
                    row.append("td").text(value);
                }
            }
        }
    );
}

d3.csv("data/All_Years_CPS.csv").then(
    function(data) {
        rawData = data;
    }
);

function optionChanged(sample){
    // create_table(rawData);
    create_chart(sample);
    var selectedSchoolData = rawData.filter((school) => school.short_name === sample);
    create_table(selectedSchoolData);
}

function create_chart(sampleID) {
        var info_array = rawData.filter(sample_object => sample_object.short_name == sampleID);
        var years = info_array.map(row=>row.year);
        var math = info_array.map(row=>row.attainment_math_pct_es);
        var reading = info_array.map(row=>row.attainment_reading_pct_es);
        var attendance = info_array.map(row => row.student_attendance_avg_pct);
        var trace1 = {
            x: years,
            y: math,
            type: "scatter",
            name: "Avg math score"
        };
        var trace2 = {
            x: years,
            y: reading,
            type: "scatter",
            name: "Avg reading score"
        };
        var data = [trace1, trace2]
        var layout1 = {yaxis: {range: [0, 100],
                               title: 'Average Score'
        },
                       title: 'Math and Reading Averages',
                       xaxis: {title: 'Years'}
    }
        var data2 = [{
            x: years, 
            y: attendance, 
            type: "scatter",
            name: "Attendance"
        }];
        var layout2 = {yaxis: {range: [80, 100],
                               title: 'Attendance'
        },
                       title: 'Attendance Rate',
                       xaxis: {title: 'Years'}
    }
        Plotly.newPlot("plot1", data, layout1);
        Plotly.newPlot("plot2", data2, layout2);
}
