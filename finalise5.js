
// this sets the map and it's opening position/coordinates and zoom level
var mymap = L.map('mapid', {
    center: [5.898367, 22.713053],
    zoom: 3,
});

//this adds the map tiles from mapbox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWJlYXJseSIsImEiOiJjazg4cHkzanAwMGdkM21wcGJvNTIyODRjIn0.ixGAhBPBItMpZQRP2Nyasg'
}).addTo(mymap);

//in later steps, the animal's coordinates get pushed to the array.
var lions = [];
var buffalos = [];
var elephants = [];
var flamingos = [];
var baboons = [];
var jackals = [];

//these set the icons for each of the animals
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

//this clusters together the Elephant and Jackal groups which otherwise overlap.
var parentGroup = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n = 0;
        for (var i = 0; i < markers.length; i++) {
            n += markers[i];
        }
        return L.divIcon({html: markers, className: 'elecluster', iconSize: L.point(20, 20)});
    }
}).addTo(mymap);

//this establishes the lion layer group which we will add the marker points to later
var lionlayerGroup = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n =0;
        for (var i = 0; i<markers.length; i++) {
            n += markers[i];
        }
        return L.divIcon({html: markers, className: 'lioncluster', iconSize: L.point(20,20)});
    }
}).addTo(mymap);

//this calls the lion JSON file and loops through each animal in the file and the loops
//through all their locations to add the coordinates to the lions array
function loadLions() {
    $.ajax({
        url: 'https://www.movebank.org/movebank/service/public/json?study_id=220229&individual_local_identifiers[]=Diana&individual_local_identifiers[]=Kiboche&individual_local_identifiers[]=Romeo&max_events_per_individual=25&sensor_type=gps',
        method: 'GET',
        dataType: 'jsonp',
        data: {},
        success: function (result) {
            var animals = result.individuals;
            for (var i = 0; i < animals.length; i++) {
                var currentAnimal = animals[i];
                var location = currentAnimal.locations;
                for (var j = 0; j < location.length; j++) {
                    var lion = [location[j].location_lat, location[j].location_long];
                    lions.push(lion);
                }
            }
            for (var k = 0; k < lions.length; k++) {
                marker = L.marker([lions[k][0], lions[k][1]], {icon: lionicon}).bindPopup('Lion');
                lionlayerGroup.addLayer(marker);
            }
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
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}

//we repeat the lion steps for all of the other animals
var buflayerGroup = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n =0;
        for (var i = 0; i<markers.length; i++) {
            n += markers[i];
        }
        return L.divIcon({html: markers, className: 'bufcluster', iconSize: L.point(20,20)});
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
                    var buffalo = [location[j].location_lat, location[j].location_long];
                    buffalos.push(buffalo);
                }
            }
            for (var k = 0; k < buffalos.length; k++) {
                marker = L.marker([buffalos[k][0], buffalos[k][1]], {icon: buficon}).bindPopup('Cape Buffalo');
                buflayerGroup.addLayer(marker);
            }
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
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}
var elelayerGroup = L.featureGroup.subGroup(parentGroup, ({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n =0;
        for (var i = 0; i<markers.length; i++) {
            n += markers[i];
        }
        return L.divIcon({html: markers, className: 'elecluster', iconSize: L.point(20,20)});
    }
})).addTo(mymap);


function loadElephants() {
    $.ajax({
        url: 'elephants.js',
        method: 'GET',
        dataType: 'json',
        data: {},
        success: function (result) {
            var animals = result.individuals;
            for (var i = 0; i < animals.length; i++) {
                var currentAnimal = animals[i];
                var location = currentAnimal.locations;
                for (var j = 0; j < location.length; j++) {
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
        return L.divIcon({html: markers, className: 'flamcluster', iconSize: L.point(20,20)});
    }
}).addTo(mymap);
function loadFlamingos() {
    $.ajax({
        url: 'flamingos.js',
        method: 'GET',
        dataType: 'json',
        data: {},
        success: function (result) {
            var animals = result.individuals;
            for (var i = 0; i < animals.length; i++) {
                var currentAnimal = animals[i];
                var location = currentAnimal.locations;
                for (var j = 0; j < location.length; j++) {
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
        return L.divIcon({html: markers, className: 'babcluster', iconSize: L.point(20,20)});
    }
}).addTo(mymap);
function loadBaboons() {
    $.ajax({
        url: 'baboons.js',
        method: 'GET',
        dataType: 'json',
        data: {},
        success: function (result) {
            var animals = result.individuals;
            for (var i = 0; i < animals.length; i++) {
                var currentAnimal = animals[i];
                var location = currentAnimal.locations;
                for (var j = 0; j < location.length; j++) {
                    var baboon = [location[j].location_lat, location[j].location_long];
                    baboons.push(baboon);
                }
            }
            for (var k = 0; k < baboons.length; k++) {
                marker = L.marker([baboons[k][0], baboons[k][1]], {icon: babicon}).bindPopup('Baboon');
                bablayerGroup.addLayer(marker);
            }
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
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}

var jacklayerGroup = L.featureGroup.subGroup(parentGroup,({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getChildCount();
        var n = 0;
        for (var i = 0; i < markers.length; i++) {
            n += markers[i];
        }
        return L.divIcon({html: markers, className: 'jackcluster', iconSize: L.point(20, 20)});
    }
})).addTo(mymap);

function loadJackals() {
    $.ajax({
        url: 'jackals.js',
        method: 'GET',
        dataType: 'json',
        data: {},
        success: function (result) {
            var animals = result.individuals;
            for (var i = 0; i < animals.length; i++) {
                var currentAnimal = animals[i];
                var location = currentAnimal.locations;
                for (var j = 0; j < location.length; j++) {
                    var jackal = [location[j].location_lat, location[j].location_long];
                    jackals.push(jackal);
                }
            }
            for (var k = 0; k < jackals.length; k++) {
                marker = L.marker([jackals[k][0], jackals[k][1]], {icon: jackicon}).bindPopup('Jackal');
                jacklayerGroup.addLayer(marker);
            }
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
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }
    })
}

//this puts all the layer groups together in one control box on the map
function loadAnimals() {
    var animalLayer = {'Lions': lionlayerGroup,
        'Cape Buffalo': buflayerGroup,
        'Elephants': elelayerGroup,
        'Flamingos': flamlayerGroup,
        'Baboons': bablayerGroup,
        'Jackals': jacklayerGroup};
    L.control.layers(null, animalLayer).addTo(mymap);
}

$(document).ready(function () {
    loadLions();
    loadBuffalo();
    loadElephants();
    loadFlamingos();
    loadBaboons();
    loadJackals();
    loadAnimals();
});

// just remove the layers at first so they show up when clicked
mymap.removeLayer(lionlayerGroup);
mymap.removeLayer(buflayerGroup);
mymap.removeLayer(elelayerGroup);
mymap.removeLayer(flamlayerGroup);
mymap.removeLayer(bablayerGroup);
mymap.removeLayer(jacklayerGroup);


$("#lion_button").click(function scrollWin(){
    window.scrollTo(0, 1150);
    // $('#lionIntro').show();
});
$("#elephant_button").click(function scrollWin(){
    window.scrollTo(0, 1150);
    // $('#elephantIntro').show();
});
$("#cape_buffalo_button").click(function scrollWin(){
    window.scrollTo(0, 1150);
    // $('#buffaloIntro').show();
});
$("#flamingo_button").click(function scrollWin(){
    window.scrollTo(0, 1150);
    // $('#flamingoIntro').show();
});
$("#jackal_button").click(function scrollWin(){
    window.scrollTo(0, 1150);
    // $('#jackalIntro').show();
});
$("#baboon_button").click(function scrollWin(){
    window.scrollTo(0, 1150);
    // $('#baboonIntro').show();
});


// Choose functions
$(document).ready(function(){
    $('#box2').hide();
    $('.functions').hide();
    $('#cityDropdown1').change(function(){
        $('#box2').show();
        $('.functions').hide();
        let country = $(this).val();
        if (country === 'ethiopia'){
            $('#cityDropdown2').html("<option value='e1'>Weather</option>" +
                "<option value='e2'>Travel agencies</option>");
            $('#e1').show();$('#k1').hide();$('#n1').hide();$('#sa1').hide();$('#t1').hide();
        } else if (country === 'kenya'){
            $('#cityDropdown2').html("<option value='k1'>Weather</option>" +
                "<option value='k2'>Travel agencies</option>");
            $('#k1').show();$('#e1').hide();$('#n1').hide();$('#sa1').hide();$('#t1').hide();
        } else if (country === 'namibia'){
            $('#cityDropdown2').html("<option value='n1'>Weather</option>" +
                "<option value='n2'>Travel agencies</option>");
            $('#n1').show();$('#e1').hide();$('#k1').hide();$('#sa1').hide();$('#t1').hide();
        } else if (country === 'southAfrica'){
            $('#cityDropdown2').html("<option value='sa1'>Weather</option>" +
                "<option value='sa2'>Travel agencies</option>");
            $('#sa1').show();$('#e1').hide();$('#k1').hide();$('#n1').hide();$('#t1').hide();
        } else if (country === 'tanzania'){
            $('#cityDropdown2').html("<option value='t1'>Weather</option>" +
                "<option value='t2'>Travel agencies</option>");
            $('#t1').show();$('#e1').hide();$('#k1').hide();$('#n1').hide();$('#sa1').hide();
        } else if (country === 'start'){
            $('#box2').hide();}
    });
    $('#cityDropdown2').change(function(){
        $('.functions').hide();
        $('#' + $(this).val()).show();
    });

    //Weather forecast
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    //Ethiopia weather
    window.myWidgetParam.push({
        id: 11,
        cityid: '337996',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherEthiopiaPC'
    });
    window.myWidgetParam.push({
        id: 12,
        cityid: '337996',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherEthiopiaMobile'
    });
    //Kenya weather
    window.myWidgetParam.push({
        id: 11,
        cityid: '192950',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherKenyaPC'
    });
    window.myWidgetParam.push({
        id: 12,
        cityid: '192950',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherKenyaMobile'
    });
    //Namibia weather
    window.myWidgetParam.push({
        id: 11,
        cityid: '3355338',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherNamibiaPC'
    });
    window.myWidgetParam.push({
        id: 12,
        cityid: '3355338',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherNamibiaMobile'
    });
    //South Africa weather
    window.myWidgetParam.push({
        id: 11,
        cityid: '3369157',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherSouthAfricaPC'
    });
    window.myWidgetParam.push({
        id: 12,
        cityid: '3369157',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherSouthAfricaMobile'
    });
    //Tanzania weather
    window.myWidgetParam.push({
        id: 11,
        cityid: '149590',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherTanzaniaPC'
    });
    window.myWidgetParam.push({
        id: 12,
        cityid: '149590',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherTanzaniaMobile'
    });
    (function () {
        var script = document.createElement('script');
        script.async = true;
        script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
    })()
});

$(document).ready(function(){
    let height = $("intro").height();  //getting windows height
    jQuery('#intro').css('height', height+'px');   //and setting height of carousel

    // Link intros to animal icons
    $("#lion_button").click(function(){
        $("#introCarousel").carousel(0);
    });

    $("#elephant_button").click(function(){
        $("#introCarousel").carousel(1);
    });

    $("#cape_buffalo_button").click(function(){
        $("#introCarousel").carousel(2);
    });

    $("#flamingo_button").click(function(){
        $("#introCarousel").carousel(3);
    });

    $("#jackal_button").click(function(){
        $("#introCarousel").carousel(4);
    });

    $("#baboon_button").click(function(){
        $("#introCarousel").carousel(5);
    });
});