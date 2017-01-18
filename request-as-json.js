// How's the weather?

var request = require('./library/request-json')
var colors = require('colors');
var prompt = require('prompt');
var Table = require('cli-table');


//var geoLocUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + result.location;
//var curWeather = "https://api.darksky.net/forecast/2052e51e5487d00d85f43ce5dc61f6fe/37.8267,-122.4233"

    
function toCelsius(f) {        // converting temp to celsius
    return (5/9) * (f-32);
}


prompt.start()

prompt.get(['location'], function(err, result) {
    if (err) {
        console.log('invalid location', err);
    }
    else {
        var location = result.location
        console.log('location: ' + location)

        var geoLocUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location;

        request(geoLocUrl, function(err, response) {
            if (err) {
                console.log('error:::', err)
            }
            else {
                var coordinate = response
                var lat = coordinate.results[0].geometry.location.lat
                var long = coordinate.results[0].geometry.location.lng
                
                var curWeather ="https://api.darksky.net/forecast/2052e51e5487d00d85f43ce5dc61f6fe/"+lat+","+long;
                
                
                request(curWeather, function(err, response){
                if(err) {
                    console.log('error', err)
                }
                else {
                    var dailyWeather = response.daily
                    
                   dailyWeather.data.forEach(function(day, i){
                        console.log("Day "+(i+1)+ " Highs of "+ day.temperatureMax+ 
                        " Lows of "+ day.temperatureMin + " Chance of " + day.icon)
                    })
                    
               }
             
              
                   // instantiate table format => UNFINISHED <=
  /*  var table = new Table({
    head: ['FORECAST:', 'TODAY', 'TOMORROW', 'DAY 3', 'DAY 4', 'DAY 5']
  , colWidths: [15, 10, 10, 10, 10, 10]
});
 
// table is an Array, so you can `push`, `unshift`, `splice` and friends 
table.push(
    ['First value','', 'Second value']
  , ['First value', 'Second value']
  , ['First value', 'Second value']
);
 
console.log(table.toString());
  */                  
        })
                
                
            }
        })


     

   }
})
