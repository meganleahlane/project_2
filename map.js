function getColor(rating) {
    return      rating == "Far Below Expectations"  ? '#990000' :
                rating == "Below Expectations"      ? '#FF9933' :
                rating == "Below Average"           ? '#993399' :
                rating == "Average"                 ? '#ffcc00' :
                rating == "Above Average"           ? '#009933' :
                rating == "Far Above Average"       ? '#0066cc' :
                                                      '#0099cc' ;        
                };

// Adding tile layer that will be the background to the map
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoibWlnbGVzaWE4OSIsImEiOiJja2JudGY0Yzcxd2FyMnZxbmRnNHdpaThiIn0.QWa_jTYDjzsLlgff5gKGsQ"
            });

var layers = {
    ES: new L.LayerGroup(),
    MS: new L.LayerGroup(),
    HS: new L.LayerGroup()
};

//Create map object
var myMap = L.map("map", {
    center: [41.87, -87.62],
    zoom: 11,
    layers: [
        layers.ES,
        layers.MS,
        layers.HS
    ]
});

streetMap.addTo(myMap);

var overlays = {
    "Elementary Schools" : layers.ES,
    "Middle Schools": layers.MS,
    "High Schools" : layers.HS
}

//Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(myMap);

//Set up the legend
var legend = L.control({
    position: "bottomright"
    });
legend.onAdd = function() {

    var div = L.DomUtil.create('div', 'info legend'),
    labels = ["Far Below Expectations", "Below Expectations", "Below Average", "Average", "Above Average", "Far Above Average"];

    div.innerHTML += '<h3>Student Attainment Rating</h3>'
    
    for (var i = 0; i< labels.length; i++) {
        div.innerHTML += 
          
        '<div style = "background:' + getColor(labels[i]) + '">'
        + labels[i] + '</div>';
    }
    
    return div;
};

legend.addTo(myMap);

var icons = {
    far_below_expectation: L.ExtraMarkers.icon({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "red",
        shape: "circle"
    }),
    below_expectations: L.ExtraMarkers.icon({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle"
    }),
    below_average: L.ExtraMarkers.icon({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "violet",
        shape: "circle"
    }),
    average: L.ExtraMarkers.icon({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "yellow",
        shape: "circle"
    }),
    above_average: L.ExtraMarkers.icon({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "green",
        shape: "circle"
    }),
    far_above_average: L.ExtraMarkers.icon({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "blue",
        shape: "circle"
    }),
};

function createMarkers(response) {

    response.forEach( function(school) {

       var category = school.primary_category;
       
       if (category == "ES") {
           schoolCategory = "ES";
        }

       else if (category == "MS") {
           schoolCategory = "MS";
        }

       else {
            schoolCategory = "HS";
        }

        var attainment = school.student_attainment_rating;
        var studentAtt = "";

        if (attainment == "FAR BELOW EXPECTATIONS") {
            studentAtt = "far_below_expectation";
        }

        else if (attainment == "BELOW EXPECTATIONS") {
                studentAtt = "below_expectations";
        }

        else if (attainment == "BELOW AVERAGE") {
                studentAtt = "below_average";
        }

        else if (attainment == "AVERAGE") {
                studentAtt = "average";
        }

        else if (attainment == "ABOVE AVERAGE") {
                studentAtt = "above_average";
        }

        else {
            studentAtt = "far_above_average";
        }
   
    var schoolMarker = L.marker([school.school_latitude, school.school_longitude], {
        icon: icons[studentAtt]
    });   
          
    schoolMarker.addTo(layers[schoolCategory]);

    schoolMarker.bindPopup("<h3> School Name: " + school.long_name + "<h3><hr><p> Address: " + school.address + "</p>" +
    "<p> Student Attainment: " + school.student_attainment_rating + "<p> School Type: " + school.school_type + "</p>").addTo(myMap);

   }
 
)};

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://data.cityofchicago.org/resource/dw27-rash.json", createMarkers);
