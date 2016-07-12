/*

Weather App using OpenWeatherMap

*/


function getLocation(){
	
	var location = document.getElementById("location").value;

/* Space replaced with '%20' */
	
	location = location.replace(" ", "%20");
	
/* Check the location isn't blank. */
	
	if (location == ""){
		
/* If location blank set red border on .error class. */

		document.getElementById("location").classList.add("error");
		
	}
	else {
		
/* If location isn't blank, remove the .error class and call the getWeather function */
		
		document.getElementById("location").classList.remove("error");
		getWeather(location);
		
	}
}

/* getWeather function calls OpenWeatherMap API and returns the current weather for the specified location. */

function getWeather(location){

	var ajax = new XMLHttpRequest();

	var json; 
	
/*

my apiKEY = 93ad9e78cbad6ae85e368e8d1db5b123


http://home.openweathermap.org/users/sign_up


*/

	var apiKEY = "93ad9e78cbad6ae85e368e8d1db5b123";
	
	
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + " ,uk&appid=" + apiKEY;


	ajax.open("GET", url, true);

	
	ajax.send();
	
	ajax.onreadystatechange = function(){


		if (ajax.readyState == 4 && ajax.status == 200){
			 

			json = JSON.parse(ajax.responseText);
            
			
/* Hide the location form in our HTML and show our weather section with the icon and the description. */

			document.getElementById("locationForm").style.display = "none";
            
                document.getElementById("WeatherAppIcon").style.display = "none"; // hide logo on search result
            document.getElementById("Title").style.display = "none"; // hide logo on search result
			document.getElementById("weather").style.display = "block";
			
/* Check the result wasn't empty. */

			if (json != undefined){
				

				var weather = json.weather[0].main
				setIconAndDescription(weather, location)
				
			}	
			else {
				
/* Default message in case of non-response from API. */

				description = "Oops, I couldn't find the weather in " + location;
				document.getElementById("description").innerHTML = description;
		
			}
		}
	}
}

function setIconAndDescription(weather, location){

	var icon;
	var description;
	

	weather = weather.toLowerCase();
		

	if (weather == "clear sky"
		|| weather == "clear"){
		
		icon = "clear.svg";
		description = "Yay, sunshine!";
		
	}
	else if (weather == "few clouds"){
		
		icon = "few-clouds.svg";
		description = "Looks a bit cloudy today.";
		
	}
	else if (weather == "scattered clouds" 
		|| weather == "broken clouds" 
		|| weather == "clouds"){
		
		icon = "clouds.svg";
		description = "Looks like scattered clouds today.";
		
	}
	else if (weather == "rain"
	|| weather == "light rain"
	|| weather == "shower rain"){
		
		icon = "rain.svg";
		description = "Oh no! It's raining!"
		
	}
	else if(weather == "thunderstorm"){
		
		icon = "thunder.svg";
		description = "Yikes, looks like a storm's brewing!"
		
	}
	else if (weather == "snow"){
		
		icon = "snow.svg";
		description = "Wrap up, it's going to snow!"
		
	}
	else if (weather == "mist"){
		
		icon = "mist.svg";
		description = "Looks a little misty today.";
		
	}
	else {
		
		icon = "default.svg";
		description = "Oops, I couldn't find the weather in " + location;
		
	}

/* Add image and description onto the page. */

	document.getElementById("weatherIcon").src = "images/" + icon;
	document.getElementById("description").innerHTML = description;
	
}


(function() {

/* Add onclick event. */

	document.getElementById("btnGo").onclick = getLocation;
	

	document.getElementById("location").onkeypress = function(key){
		
		if (key.keyCode == "13"){
			
			getLocation();
			
		}
	}
    
    
    
    
    /* function below allows form to be sent when enter is pressed http://stackoverflow.com/questions/29943/how-to-submit-a-form-when-the-return-key-is-pressed */
    
    function checkSubmit(e)
{
   if(e && e.keyCode == 13)
   {
      document.forms[0].submit();
   }

    
     onClick="window.location.reload(true)"
    
    //adding reload button
     
     
     
    
}

})();

