// Adding tile layer that will be the background to the map
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
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

function createMarkers(response) {

    var schoolMarkers = [];

    response.forEach( function(school) {

       var category = school.primary_category;
       
       if (category == "ES") {
           schoolCategory = "ES"
       }

       else if (category == "MS") {
           schoolCategory = "MS"
       }

       else {
            schoolCategory = "HS"
       }

    var schoolMarker = L.marker([school.school_latitude, school.school_longitude]);
                
    schoolMarker.addTo(layers[schoolCategory]);

    schoolMarker.bindPopup("<h3> School Name: " + school.long_name + "<h3><hr><p> Address: " + school.address + "</p>" +
    "<p> Student Attainment: " + school.student_attainment_rating + "</p>").addTo(myMap);

   }
 
)};

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://data.cityofchicago.org/resource/dw27-rash.json", createMarkers);
