//Defining constants
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const background = document.getElementById("body");

//Assigning values to "weather" so I have spots to place the data grabbed from the API
const weather = {

    temperature : {
        value : 18,
        unit : "celsius"
    },

    description : "few clouds",
    iconID : "01d",
    city : "London",
    country : "GB"
}
//This is the function that updates the elements using the data from the API
function displayWeather(){

iconElement.innerHTML = 
`<img src="icons/${weather.iconId}.png"/>`;

tempElement.innerHTML = 
`${weather.temperature.value}&#176;<span>C</span>`;

descElement.innerHTML = 
weather.description;

locationElement.innerHTML = 
`${weather.city}, ${weather.country}`;

}
//converting temp to C to F
weather.temperature.value  = 300 - 273
//converting temp from C to F
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5 ) + 32;
}

tempElement.addEventListener("click", function(){
    //prevents code from running if temp is undefinied 
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}&#176 <span>F</span>`;
        weather.temperature.unit = "fahrenheit";
  
    }else{

        tempElement.innerHTML = `${weather.temperature.value}&#176 <span>F</span>`;
        weather.temperature.unit = "celsius";

    }
});

//Getting Users location

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);

}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML="<p> Your browser does not support geolocation.</p>"


}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML=`<p> ${error.message} </p>`;

}

//Grabbing API Info

const KELVIN = 273;
const key = "4548056af843bc41b17dffe34a2db72b";

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=4548056af843bc41b17dffe34a2db72b`;

    fetch(api) .then(function(response){
        let data = response.json();
        return data;
    })

    .then(function(data){

        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })

    .then( function(){
        displayWeather();
    });
}




//Code to change background color based on conditions

//if (weather.temperature.value > 20 ) {
   // background.style.backgroundColor = "green"
//}

//then





//code ends here
//getCurrentPosition(setPosition, error);

//setPosition(position)
  //  position.coords.latitude
    //position.coords.longitude

//error(error)
  //  error.message
