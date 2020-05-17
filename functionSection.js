alert("JS works");
window.onload = function() {
    if (window.jQuery) {
        alert("jQuery works");
    } else {
        alert("jQuery doesn't work");
}};
$(document).ready(function(){
    $('.functions').hide();
    $('#cityDropdown1').change(function(){
        let country = $(this).val();
        if (country === 'ethiopia'){
            $('#cityDropdown2').html("<option value='e1'>Weather</option>" +
                                     "<option value='e2'>Travel agencies</option>" +
                                     "<option value='e3'>Flights</option>");
            $('#e1').show();$('#k1').hide();$('#n1').hide();$('#sa1').hide();$('#t1').hide();
        } else if (country === 'kenya'){
            $('#cityDropdown2').html("<option value='k1'>Weather</option>" +
                                     "<option value='k2'>Travel agencies</option>" +
                                     "<option value='k3'>Flights</option>");
            $('#k1').show();$('#e1').hide();$('#n1').hide();$('#sa1').hide();$('#t1').hide();
        } else if (country === 'namibia'){
            $('#cityDropdown2').html("<option value='n1'>Weather</option>" +
                                     "<option value='n2'>Travel agencies</option>" +
                                     "<option value='n3'>Flights</option>");
            $('#n1').show();$('#e1').hide();$('#k1').hide();$('#sa1').hide();$('#t1').hide();
        } else if (country === 'southAfrica'){
            $('#cityDropdown2').html("<option value='sa1'>Weather</option>" +
                                     "<option value='sa2'>Travel agencies</option>" +
                                     "<option value='sa3'>Flights</option>");
            $('#sa1').show();$('#e1').hide();$('#k1').hide();$('#n1').hide();$('#t1').hide();
        } else if (country === 'tanzania'){
            $('#cityDropdown2').html("<option value='t1'>Weather</option>" +
                                     "<option value='t2'>Travel agencies</option>" +
                                     "<option value='t3'>Flights</option>");
            $('#t1').show();$('#e1').hide();$('#k1').hide();$('#n1').hide();$('#sa1').hide();
        }
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
        containerid: 'weatherEthiopia'
    });
    //Kenya weather
    window.myWidgetParam.push({
        id: 11,
        cityid: '192950',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherKenya'
    });
    //Namibia weather
    window.myWidgetParam.push({
        id: 11,
        cityid: '3355338',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherNamibia'
    });
    //South Africa weather
    window.myWidgetParam.push({
        id: 11,
        cityid: '3369157',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherSouthAfrica'
    });
    //Tanzania weather
    window.myWidgetParam.push({
        id: 11,
        cityid: '149590',
        appid: '1a58e9c9c326970f7cd468f40a839495',
        units: 'metric',
        containerid: 'weatherTanzania'
    });
    (function () {
        var script = document.createElement('script');
        script.async = true;
        script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
    })();
});