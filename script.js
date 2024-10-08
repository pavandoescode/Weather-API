const cityname = document.getElementById("cityname");
const button = document.getElementById("button");
const loader = document.getElementById("loder");
const main_box = document.getElementById("main_box");
const error_box = document.getElementById("error_box");
const displayCity = document.getElementById("displayCity");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const min_temp = document.getElementById("min_temp");
const max_temp = document.getElementById("max_temp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");


button.addEventListener("click", (e) => {
    e.preventDefault();
    
    loader.classList.remove("visually-hidden");
    if (cityname.value == "") {
        alert("Please enter the name of the city");
    } else {
        getData(cityname.value);
    }
});


async function getData(city) {
    main_box.classList.add("visually-hidden");
    loader.classList.remove("visually-hidden");
    error_box.innerHTML = "";

    try {
        const encodedCity = encodeURIComponent(city);
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodedCity}`;
        
        const options = {
            method: "GET",
            headers: {
                'x-rapidapi-key': 'fdb94007acmsh47f62544438c7c2p1018d1jsnc080cc117183', 
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            },
        };

        const response = await fetch(url, options);
        
        if (response.ok) {
            const result = await response.json();
            main_box.classList.remove("visually-hidden");
            loader.classList.add("visually-hidden");

           
            displayCity.innerHTML = city;
            temp.innerHTML = `${result.current.temp_c}°C`;
            humidity.innerHTML = `${result.current.humidity}%`;
            min_temp.innerHTML = `${result.current.feelslike_c}°C`; 
            max_temp.innerHTML = `${result.current.temp_c}°C`; 
            
        } else {
            main_box.classList.add("visually-hidden");
            loader.classList.add("visually-hidden");
            error_box.innerHTML = "Oops! This place doesn't exist";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        loader.classList.add("visually-hidden");
        error_box.innerHTML = "An error occurred. Please try again later.";
        console.log((error));
    }
}


getData("Surat");
cityname.value = "Surat"; 
