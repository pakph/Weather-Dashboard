var apiKey = "06bd3e6aff04a75bd8f5eafbf7d1f572";
var time = moment().format();
console.log (time)

//This will search up the weather for the city
$(document).ready(function(){
    $("#search").click(function(event){
        event.preventDefault();
        var cityName = $(".form-control").val();

        //This obtains the results of the current weather in the city
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey,
            method: "GET",
        }).then(function(response){
            
            console.log(response);

            $("#weather-card").empty()
            
            //This adds the city name to the search history
            $("#search-history").append('<li>' + cityName + '</li>');

            //Creates a row and column for the city, date, and weather
            var row1 = $('<div class="row"></div>')
            var col3 = $('<div class="col-lg-3"></div>')

            //Adds the city, date, and weather
            var months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            var date = new Date();
            var month = months[date.getMonth()];
            var day = date.getDate();
            var cityDateWeatherUl = $('<ul class="list-unstyled ml-3 mt-1">')
            $("#weather-card").append(row1)
            $(row1).append(col3)
            $(col3).append(cityDateWeatherUl)
            $(cityDateWeatherUl).append('<li>' + '<h4>' + cityName + '</h4>' + '</li>');
            $(cityDateWeatherUl).append('<li>' + month + " " + day + '</li>')
            $(cityDateWeatherUl).append('<li>' + response.weather[0].main + '</li>')

            //Adds a new row for the weather icon, temperature, and weather conditions
            var row2 = $('<div class="row"></div>')
            $("#weather-card").append(row2)
            
            //Add new columns for the weather icon, temperature, and weather conditions
            var colIcon = $('<div class="col-lg-3"></div>')
            var colTemp = $('<div class="col-lg-3"></div>')
            var colCond = $('<div class="col-lg-3"></div>')
            $(row1).append(colIcon);
            $(row1).append(colTemp);
            $(row1).append(colCond);

            //Adds the weather icon to the icon column
            var weatherIcon = response.weather[0].icon;
            var weatherIconLink = '"http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png"';
            var weatherIconImg = $('<img src=' + weatherIconLink + '/>')
            weatherIconImg.css({
                "width": "64px",
                "height": "auto",
                })
            $(colIcon).append(weatherIconImg);
            
            //Adds the current temperature of the city
            var currentTemp = (response.main.temp);
            $(colTemp).append('<h2>' + Math.floor(currentTemp) + ' °F</h2>')
            $(colTemp).css({
                "position": "absolute",
                "left": "33%",
                "top": "9%",
               
            })

            //Adds the current weather conditions of the city
            var weatherConditionUl = $('<ul class="list-unstyled">');
            var humidity = (response.main.humidity);
            $(weatherConditionUl).append('<li>' + 'Humidity: ' + humidity + '</li>')
            $(colCond).append(weatherConditionUl)
            $(colCond).css({
                "position": "absolute",
                "top": "9%",
                "left": "66%",
                
            })


        })

       

    })
})

