function dropdown_data(){
    var select_dropdown = d3.select("#selDataset");
    d3.csv ("All_Years_CPS.csv").then((data)=>{
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
    });
}
dropdown_data()

// function school_data(sampleID){
//     d3.json ("All_Years_CPS.csv").then((data)=>{
//     var ??? = ???.???;
//     var info_array = ???.filter(sample_object => sample_object.id == sampleID);
//     var result = info_array[0];
//     var display = d3.select("#moreSchoolInfo");
//     display.html("");
//     Object.entries(result).forEach(([key, value])=>{
//         display.append("h6").text(`${key};${value}`);
//     });
//     });
// }

function optionChanged(sample){
    // school_data(sample);
    create_chart(sample);
}

function create_chart(sampleID){
    d3.csv ("All_Years_CPS.csv").then((data)=>{
        var info_array = data.filter(sample_object => sample_object.short_name == sampleID);
        var years = info_array.map(row=>row.year);
        var math = info_array.map(row=>row.attainment_math_pct_es);
        var reading = info_array.map(row=>row.attainment_reading_pct_es);
        var suspension_rate = info_array.map(row => row.suspensions_per_100_students_avg_pct);
        var trace1 = {
            x: years,
            y: math,
            type: "scatter",
            name: "Average math score"
        };
        var trace2 = {
            x: years,
            y: reading,
            type: "scatter",
            name: "Average reading score"
        };
        var data = [trace1, trace2]
        var layout1 = {yaxis: {range: [0, 100],
                               title: 'Average Score'
        },
                       title: 'Math and Reading averages',
                       xaxis: {title: 'Years'}
    }
        var data2 = [{
            x: years, 
            y: suspension_rate, 
            type: "scatter",
            name: "Suspensions"
        }];
        var layout2 = {yaxis: {range: [0, Math.max(suspension_rate)],
                               title: 'Suspensions'
        },
                       title: 'Suspensions per 100 students',
                       xaxis: {title: 'Years'}
    }
        Plotly.newPlot("plot1", data, layout1);
        Plotly.newPlot("plot2", data2, layout2);
});
}
