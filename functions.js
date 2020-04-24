$(document).ready(function () {
    $.ajax({
        url: 'https://www.movebank.org/movebank/service/public/json?study_id=220229&individual_local_identifiers[]=Diana&individual_local_identifiers[]=Kiboche&individual_local_identifiers[]=Romeo&max_events_per_individual=25&sensor_type=gps',
        method: 'GET',
        dataType: 'jsonp',
        data: {
        },
        success: function (result) {
            var animals = result.individuals;
            for (var i=0; i<animals.length;i++){
                var currentAnimal = animals[i];
               // console.log(currentAnimal);
                var location = currentAnimal.locations;
                console.log(location);
                for (var i=0; i<location.length;i++){
                    //the following two lines log the long and lat in the console
                    console.log(location[i].location_long);
                    console.log(location[i].location_lat);
                    //the following lines add the latitude info to the Lat div and is rendered on the web page
                    var lat = location[i].location_lat;
                    $("#Lat").append(lat);
                }
            }
        },
        error: function (data) {
            console.log("Error coming from server:" + data);
        }

    })
})

/*$(document).ready(function () {
    $.ajax({
        dataType: "json",
        url: 'https://www.movebank.org/movebank/service/public/json?study_id=220229&individual_local_identifiers[]=Diana&individual_local_identifiers[]=Kiboche&individual_local_identifiers[]=Romeo&max_events_per_individual=25&sensor_type=gps',
        data: console.log(data)
        })
})
*/

