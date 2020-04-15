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
                console.log(currentAnimal);
                var location = currentAnimal.locations;
                console.log(location);
                var lat = location.location_lat;
                console.log(lat);
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

