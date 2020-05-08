//idea: make a list (array?) of the JSON links and make a for loop through all the links
//then I won't have to copy and past the function for each new animal, i think, and
//i think it will put all the layer groups together.
var mymap = L.map('mapid', {
    center: [5.898367, 22.713053],
    zoom: 3,
//layers: [londoncities, leuvencities]
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWJlYXJseSIsImEiOiJjazg4cHkzanAwMGdkM21wcGJvNTIyODRjIn0.ixGAhBPBItMpZQRP2Nyasg'
}).addTo(mymap);


var lions = [];
var buffalos = [];
var elephants = [];
var flamingos = [];
var baboons = [];
var jackals = [];

// later we will add individual lion locations to this array, and will get one big array of all 75 locations once loop is over
var liongroup = L.layerGroup([]);
var lionicon = L.icon({
    iconUrl: 'images/lionicon.png',
    iconSize: [38,38],
    iconAnchor: [22,94],
    popupAnchor: [-3,-90]
});
var buficon = L.icon({
    iconUrl: 'images/buffaloicon.png',
    iconSize: [38,38],
    iconAnchor: [22,94],
    popupAnchor: [-3,-90]
});

var eleicon = L.icon({
    iconUrl: 'images/eleicon.png',
    iconSize: [38,38],
    iconAnchor: [22,94],
    popupAnchor: [-3,-90]
});

var flamicon = L.icon({
    iconUrl: 'images/flamicon.png',
    iconSize: [38,38],
    iconAnchor: [22,94],
    popupAnchor: [-3,-90]
});

var babicon = L.icon({
    iconUrl: 'images/babicon.png',
    iconSize: [38,38],
    iconAnchor: [22,94],
    popupAnchor: [-3,-90]
});

var jackicon = L.icon({
    iconUrl: 'images/jackicon.png',
    iconSize: [38,38],
    iconAnchor: [22,94],
    popupAnchor: [-3,-90]
});

var lionlayerGroup = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n =0;
        for (var i = 0; i<markers.length; i++) {
            n += markers[i];
        }
        console.log(markers);
        return L.divIcon({html: markers, className: 'lioncluster', iconSize: L.point(30,30)});
    }
}).addTo(mymap);
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

// var lionlayerGroup = L.markerClusterGroup().addTo(mymap);
            for (var k = 0; k < lions.length; k++) {
                marker = L.marker([lions[k][0], lions[k][1]], {icon: lionicon}).bindPopup('lion');
                lionlayerGroup.addLayer(marker);
            }
//mymap.addLayer(lionlayerGroup);

//click function
            $("#lion_button").click(function(event) {
                event.preventDefault();
                if(mymap.hasLayer(lionlayerGroup)) {
                    $(this).removeClass('selected');
                    mymap.removeLayer(lionlayerGroup);
                } else {
                    mymap.addLayer(lionlayerGroup);
                    $(this).addClass('selected');
                }
            });



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
var buflayerGroup = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n =0;
        for (var i = 0; i<markers.length; i++) {
            n += markers[i];
        }
        console.log(markers);
        return L.divIcon({html: markers, className: 'bufcluster', iconSize: L.point(30,30)});
    }
}).addTo(mymap);
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
            for (var k = 0; k < buffalos.length; k++) {
                marker = L.marker([buffalos[k][0], buffalos[k][1]], {icon: buficon}).bindPopup('water buffalo');
                buflayerGroup.addLayer(marker);
            }
//click function
            $("#cape_buffalo_button").click(function(event) {
                event.preventDefault();
                if(mymap.hasLayer(buflayerGroup)) {
                    $(this).removeClass('selected');
                    mymap.removeLayer(buflayerGroup);
                } else {
                    mymap.addLayer(buflayerGroup);
                    $(this).addClass('selected');
                }
            });
            var bufoverlay = {'Water Buffalo': buflayerGroup};
            L.control.layers(null, bufoverlay).addTo(mymap);
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}

var elelayerGroup = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n =0;
        for (var i = 0; i<markers.length; i++) {
            n += markers[i];
        }
        console.log(markers);
        return L.divIcon({html: markers, className: 'elecluster', iconSize: L.point(30,30)});
    }
}).addTo(mymap);
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
            for (var k = 0; k < elephants.length; k++) {
                var marker = L.marker([elephants[k][0], elephants[k][1]], {icon: eleicon}).bindPopup('Elephant');
                elelayerGroup.addLayer(marker);
            }
            $("#elephant_button").click(function(event) {
                event.preventDefault();
                if(mymap.hasLayer(elelayerGroup)) {
                    $(this).removeClass('selected');
                    mymap.removeLayer(elelayerGroup);
                } else {
                    mymap.addLayer(elelayerGroup);
                    $(this).addClass('selected');
                }
            });
            var eleoverlay = {'Elephants': elelayerGroup};
            L.control.layers(null, eleoverlay).addTo(mymap);
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}
var flamlayerGroup = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n =0;
        for (var i = 0; i<markers.length; i++) {
            n += markers[i];
        }
        console.log(markers);
        return L.divIcon({html: markers, className: 'flamcluster', iconSize: L.point(30,30)});
    }
}).addTo(mymap);
function loadFlamingos() {
    $.ajax({
        url: 'https://www.movebank.org/movebank/service/json-auth?study_id=446595&individual_local_identifiers[]=90932A&individual_local_identifiers[]=90933A&individual_local_identifiers[]=90934A&individual_local_identifiers[]=90935A&individual_local_identifiers[]=90936A-Kipngetich&individual_local_identifiers[]=90937A-Kasiki&individual_local_identifiers[]=90938A-Nyunja&individual_local_identifiers[]=90939A-Abshiro&individual_local_identifiers[]=90940A-Owino&max_events_per_individual=6&sensor_type=gps',
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
                    var flamingo = [location[j].location_lat, location[j].location_long];
                    flamingos.push(flamingo);
                }
            }
            for (var k = 0; k < flamingos.length; k++) {
                marker = L.marker([flamingos[k][0], flamingos[k][1]], {icon: flamicon}).bindPopup('Flamingo');
                flamlayerGroup.addLayer(marker);
            }
            $("#flamingo_button").click(function(event) {
                event.preventDefault();
                if(mymap.hasLayer(flamlayerGroup)) {
                    $(this).removeClass('selected');
                    mymap.removeLayer(flamlayerGroup);
                } else {
                    mymap.addLayer(flamlayerGroup);
                    $(this).addClass('selected');
                }
            });
            var flamoverlay = {'Flamingos': flamlayerGroup};
            L.control.layers(null, flamoverlay).addTo(mymap);
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}
var bablayerGroup = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n =0;
        for (var i = 0; i<markers.length; i++) {
            n += markers[i];
        }
        console.log(markers);
        return L.divIcon({html: markers, className: 'babcluster', iconSize: L.point(30,30)});
    }
}).addTo(mymap);
function loadBaboons() {
    $.ajax({
        url: 'https://www.movebank.org/movebank/service/json-auth?study_id=177002088&individual_local_identifiers[]=F1&individual_local_identifiers[]=F10&individual_local_identifiers[]=F11&individual_local_identifiers[]=F2&individual_local_identifiers[]=F3&individual_local_identifiers[]=F4&individual_local_identifiers[]=F5&individual_local_identifiers[]=F6&individual_local_identifiers[]=F7&individual_local_identifiers[]=F8&individual_local_identifiers[]=F9&individual_local_identifiers[]=M1&individual_local_identifiers[]=M2&individual_local_identifiers[]=MNA&max_events_per_individual=4&sensor_type=natural-mark',
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
                    var baboon = [location[j].location_lat, location[j].location_long];
                    baboons.push(baboon);
                }
            }
            //var bablayerGroup = L.markerClusterGroup().addTo(mymap);
            for (var k = 0; k < baboons.length; k++) {
                marker = L.marker([baboons[k][0], baboons[k][1]], {icon: babicon}).bindPopup('Baboon');
                bablayerGroup.addLayer(marker);
            }
           // mymap.addLayer(bablayerGroup);
            $("#baboon_button").click(function(event) {
                event.preventDefault();
                if(mymap.hasLayer(bablayerGroup)) {
                    $(this).removeClass('selected');
                    mymap.removeLayer(bablayerGroup);
                } else {
                    mymap.addLayer(bablayerGroup);
                    $(this).addClass('selected');
                }
            });

            var baboverlay = {'Baboons': bablayerGroup};
            L.control.layers(null, baboverlay).addTo(mymap);
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}

var jacklayerGroup = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n =0;
        for (var i = 0; i<markers.length; i++) {
            n += markers[i];
        }
        console.log(markers);
        return L.divIcon({html: markers, className: 'jackcluster', iconSize: L.point(30,30)});
    }
}).addTo(mymap);
function loadJackals() {
    $.ajax({
        url: 'https://www.movebank.org/movebank/service/json-auth?study_id=304875150&individual_local_identifiers[]=CM05&individual_local_identifiers[]=CM08&individual_local_identifiers[]=CM09&individual_local_identifiers[]=CM10&individual_local_identifiers[]=CM11&individual_local_identifiers[]=CM15&individual_local_identifiers[]=CM18&individual_local_identifiers[]=CM20&individual_local_identifiers[]=CM23&max_events_per_individual=6&sensor_type=gps',
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
                    var jackal = [location[j].location_lat, location[j].location_long];
                    jackals.push(jackal);
                }
            }
            //var jacklayerGroup = L.markerClusterGroup().addTo(mymap);
            for (var k = 0; k < jackals.length; k++) {
                marker = L.marker([jackals[k][0], jackals[k][1]], {icon: jackicon}).bindPopup('Jackal');
                jacklayerGroup.addLayer(marker);
            }
            //mymap.addLayer(jacklayerGroup);
            $("#jackal_button").click(function(event) {
                event.preventDefault();
                if(mymap.hasLayer(jacklayerGroup)) {
                    $(this).removeClass('selected');
                    mymap.removeLayer(jacklayerGroup);
                } else {
                    mymap.addLayer(jacklayerGroup);
                    $(this).addClass('selected');
                }
            });

            var jackoverlay = {'Jackals': jacklayerGroup};
            L.control.layers(null, jackoverlay).addTo(mymap);
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}

$(document).ready(function () {
    loadLions();
    loadBuffalo();
    loadElephants();
    loadFlamingos();
    loadBaboons();
    loadJackals();
})
// just remove them at first
mymap.removeLayer(lionlayerGroup);
mymap.removeLayer(buflayerGroup);
mymap.removeLayer(elelayerGroup);
mymap.removeLayer(flamlayerGroup);
mymap.removeLayer(bablayerGroup);
mymap.removeLayer(jacklayerGroup);

//example to delete

// var westminster = L.marker([51.496654, -0.137501]).bindPopup('This is Westminster'),
//     coventgarden = L.marker([51.510866, -0.122738]).bindPopup('This is Covent Garden'),
//     tubestop = L.marker([51.503814, -0.083599]).bindPopup('This is a tube station'),
//     sintmichaels = L.marker([50.876262, 4.701049]).bindPopup('This is Sint-Michaels Church'),
//     townhall = L.marker([50.878947, 4.701198]).bindPopup('This is the Town Hall'),
//     univlib = L.marker([50.877988, 4.707507]).bindPopup('This is the University Library');
//
// var londoncities = L.layerGroup([westminster, coventgarden, tubestop]);
// var leuvencities = L.layerGroup([sintmichaels, townhall, univlib]);
//
// $("#leopard_button").click(function(event) {
//     event.preventDefault();
//     if(mymap.hasLayer(londoncities)) {
//         $(this).removeClass('selected');
//         mymap.removeLayer(londoncities);
//     } else {
//         mymap.addLayer(londoncities);
//         $(this).addClass('selected');
//     }
// });

$("#lion_button").click(function scrollWin(){
    window.scrollTo(0, 700);
});
$("#elephant_button").click(function scrollWin(){
    window.scrollTo(0, 700);
});
$("#cape_buffalo_button").click(function scrollWin(){
    window.scrollTo(0, 700);
});
$("#flamingo_button").click(function scrollWin(){
    window.scrollTo(0, 700);
});
$("#jackal_button").click(function scrollWin(){
    window.scrollTo(0, 700);
});
$("#baboon_button").click(function scrollWin(){
    window.scrollTo(0, 700);
});

//example to remove
// var marker = L.marker([51.5, -0.09]).addTo(mymap);
// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     id: 'spot',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);
// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");
//
// var popup = L.popup();
//
// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }
//
// mymap.on('click', onMapClick);
//
// //to remove
// var overlayMaps = {
//     "London Cities": londoncities,
//     "Leuven Places": leuvencities,
//     //can't add lion overlay here because it's a local variable --is there a way to change that?
//     //"LIONS": lionoverlay
//     //"Lions": liongroup,
// };
// L.control.layers(null, overlayMaps).addTo(mymap);
// The null in the above line is because I have only one baselayer here, not
// multiple to chose from, however, using multiple baselayers might be an option for
// the different time periods? I need to explore how to use leaflets with an map with an
// image on top






