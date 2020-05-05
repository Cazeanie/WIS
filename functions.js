//idea: make a list (array?) of the JSON links and make a for loop through all the links
//then I won't have to copy and past the function for each new animal, i think, and
//i think it will put all the layer groups together.

var lions = [];
var buffalos = [];
var elephants = [];
// later we will add individual lion locations to this array, and will get one big array of all 75 locations once loop is over
var liongroup = L.layerGroup([]);
var lionicon = L.icon({
    iconUrl: 'lionicon.png',
    iconSize: [38,38],
    iconAnchor: [22,94],
    popupAnchor: [-3,-90]
});
var buficon = L.icon({
    iconUrl: 'buffaloicon.png',
    iconSize: [38,38],
    iconAnchor: [22,94],
    popupAnchor: [-3,-90]
});

var eleicon = L.icon({
    iconUrl: 'eleicon.png',
    iconSize: [38,38],
    iconAnchor: [22,94],
    popupAnchor: [-3,-90]
})

function loadLions() {
    $.ajax({
        url: 'https://www.movebank.org/movebank/service/public/json?study_id=220229&individual_local_identifiers[]=Diana&individual_local_identifiers[]=Kiboche&individual_local_identifiers[]=Romeo&max_events_per_individual=25&sensor_type=gps',
        method: 'GET',
        dataType: 'jsonp',
        data: {},
        success: function (result) {
            var animals = result.individuals;
            // console.log(animals);
            for (var i = 0; i < animals.length; i++) {
                var currentAnimal = animals[i];
                //console.log(currentAnimal);
                var location = currentAnimal.locations;
                // console.log(location);
                //use j as variable in inner loop
                for (var j = 0; j < location.length; j++) {
                    //the following two lines log the long and lat in the console
                    //  console.log(location[j].location_long);
                    // console.log(location[j].location_lat);
                    //the following lines add the latitude info to the Lat div and is rendered on the web page
                    var lat = location[j].location_lat;
                    // $("#Lat").append(lat);
                    var lion = [location[j].location_lat, location[j].location_long];
                    lions.push(lion);
                }
            }
            //big lion array of all the lion locations logs in console properly
            // console.log(lions);
            // var markerClusters = L.markerClusterGroup();

            var lionlayerGroup = L.markerClusterGroup().addTo(mymap);
            for (var k = 0; k < lions.length; k++) {
                marker = L.marker([lions[k][0], lions[k][1]], {icon: lionicon}).bindPopup('lion');
                lionlayerGroup.addLayer(marker);
            }
            mymap.addLayer(lionlayerGroup);

            var lionoverlay = {'Lions': lionlayerGroup};
            L.control.layers(null, lionoverlay).addTo(mymap);
            //console.log(liongroup)
        },

        error: function (data) {
            console.log("Error coming from server:" + data);
        }

    })
    // Do i put the next AJAX call here? Or do I need a totally separate $(document).ready(function () {
    //If so, I'm worried the layer controls will be separate for each animal. Is that ok?
    //And what should we do for animals we have more than one JSON file for?
}

function loadBuffalo() {
    $.ajax({
        url: 'https://www.movebank.org/movebank/service/public/json?study_id=1764627&individual_local_identifiers[]=Cilla&individual_local_identifiers[]=Gabs&individual_local_identifiers[]=Mvubu&individual_local_identifiers[]=Pepper&individual_local_identifiers[]=Queen&individual_local_identifiers[]=Toni&max_events_per_individual=10&sensor_type=gps',
        method: 'GET',
        dataType: 'jsonp',
        data: {},
        success: function (result) {
            var animals = result.individuals;
            for (var i = 0; i < animals.length; i++) {
                var currentAnimal = animals[i];
                var location = currentAnimal.locations;
                for (var j = 0; j < location.length; j++) {
                    var lat = location[j].location_lat;
                    var buffalo = [location[j].location_lat, location[j].location_long];
                    buffalos.push(buffalo);
                }
            }
            var buflayerGroup = L.markerClusterGroup().addTo(mymap);
            for (var k = 0; k < buffalos.length; k++) {
                marker = L.marker([buffalos[k][0], buffalos[k][1]], {icon: buficon}).bindPopup('water buffalo');
                buflayerGroup.addLayer(marker);
            }
            mymap.addLayer(buflayerGroup);

            var bufoverlay = {'Water Buffalo': buflayerGroup};
            L.control.layers(null, bufoverlay).addTo(mymap);
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}

function loadElephants() {
    $.ajax({
        url: 'https://www.movebank.org/movebank/service/json-auth?&study_id=605129389&individual_local_identifiers[]=LA1&individual_local_identifiers[]=LA11&individual_local_identifiers[]=LA12&individual_local_identifiers[]=LA13&individual_local_identifiers[]=LA14&individual_local_identifiers[]=LA15&individual_local_identifiers[]=LA2&individual_local_identifiers[]=LA26&individual_local_identifiers[]=LA27&individual_local_identifiers[]=LA3&individual_local_identifiers[]=LA4&individual_local_identifiers[]=LA5&individual_local_identifiers[]=LA6&individual_local_identifiers[]=LA7&individual_local_identifiers[]=LA8&max_events_per_individual=5&sensor_type=gps',
        method: 'GET',
        dataType: 'jsonp',
        data: {},
        success: function (result) {
            var animals = result.individuals;
            for (var i = 0; i < animals.length; i++) {
                var currentAnimal = animals[i];
                var location = currentAnimal.locations;
                for (var j = 0; j < location.length; j++) {
                    var lat = location[j].location_lat;
                    var elephant = [location[j].location_lat, location[j].location_long];
                    elephants.push(elephant);
                }
            }
            var elelayerGroup = L.markerClusterGroup().addTo(mymap);
            for (var k = 0; k < elephants.length; k++) {
                marker = L.marker([elephants[k][0], elephants[k][1]], {icon: eleicon}).bindPopup('Elephant');
                elelayerGroup.addLayer(marker);
            }
            mymap.addLayer(elelayerGroup);

            var eleoverlay = {'Elephants': elelayerGroup};
            L.control.layers(null, eleoverlay).addTo(mymap);
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
    $.ajax({
        url: 'https://www.movebank.org/movebank/service/json-auth?&study_id=736029750&individual_local_identifiers[]=AM105&individual_local_identifiers[]=AM107&individual_local_identifiers[]=AM108&individual_local_identifiers[]=AM110&individual_local_identifiers[]=AM239&individual_local_identifiers[]=AM253&individual_local_identifiers[]=AM254&individual_local_identifiers[]=AM255&individual_local_identifiers[]=AM306&individual_local_identifiers[]=AM307&individual_local_identifiers[]=AM91&individual_local_identifiers[]=AM93&individual_local_identifiers[]=AM99&max_events_per_individual=5&sensor_type=gps',
        method: 'GET',
        dataType: 'jsonp',
        data: {},
        success: function (result) {
            var animals = result.individuals;
            for (var i = 0; i < animals.length; i++) {
                var currentAnimal = animals[i];
                var location = currentAnimal.locations;
                for (var j = 0; j < location.length; j++) {
                    var lat = location[j].location_lat;
                    var elephant = [location[j].location_lat, location[j].location_long];
                    elephants.push(elephant);
                }
            }
            var elelayerGroup = L.markerClusterGroup().addTo(mymap);
            for (var k = 0; k < elephants.length; k++) {
                marker = L.marker([elephants[k][0], elephants[k][1]], {icon: eleicon}).bindPopup('Elephant');
                elelayerGroup.addLayer(marker);
            }
            mymap.addLayer(elelayerGroup);

            var eleoverlay = {'Elephants': elelayerGroup};
            L.control.layers(null, eleoverlay).addTo(mymap);
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}

$(document).ready(function () {
    loadLions()
    loadBuffalo()
    loadElephants()
})

//example to delete
var westminster = L.marker([51.496654, -0.137501]).bindPopup('This is Westminster'),
    coventgarden = L.marker([51.510866, -0.122738]).bindPopup('This is Covent Garden'),
    tubestop = L.marker([51.503814, -0.083599]).bindPopup('This is a tube station'),
    sintmichaels = L.marker([50.876262, 4.701049]).bindPopup('This is Sint-Michaels Church'),
    townhall = L.marker([50.878947, 4.701198]).bindPopup('This is the Town Hall'),
    univlib = L.marker([50.877988, 4.707507]).bindPopup('This is the University Library');

var londoncities = L.layerGroup([westminster, coventgarden, tubestop]);
var leuvencities = L.layerGroup([sintmichaels, townhall, univlib]);

//remove the layers
var mymap = L.map('mapid', {
    center: [5.898367, 22.713053],
    zoom: 3,
    layers: [londoncities, leuvencities]
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWJlYXJseSIsImEiOiJjazg4cHkzanAwMGdkM21wcGJvNTIyODRjIn0.ixGAhBPBItMpZQRP2Nyasg'
}).addTo(mymap);

//example to remove
var marker = L.marker([51.5, -0.09]).addTo(mymap);
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    id: 'spot',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

//to remove
var overlayMaps = {
    "London Cities": londoncities,
    "Leuven Places": leuvencities,
    //can't add lion overlay here because it's a local variable --is there a way to change that?
    //"LIONS": lionoverlay
    //"Lions": liongroup,
};
L.control.layers(null, overlayMaps).addTo(mymap);
// The null in the above line is because I have only one baselayer here, not
// multiple to chose from, however, using multiple baselayers might be an option for
// the different time periods? I need to explore how to use leaflets with an map with an
// image on top