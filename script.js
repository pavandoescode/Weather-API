button.addEventListener("click", (e) => {
  e.preventDefault();

  loder.classList.remove("visually-hidden");
  if (cityname.value == "") {
    alert("Please enter name of city");
  } else {
    getData(cityname.value);
  }
});

async function getData(city) {
  main_box.classList.add("visually-hidden");
  loder.classList.remove("visually-hidden");

  try {
    const url =
      "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fdb94007acmsh47f62544438c7c2p1018d1jsnc080cc117183",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    console.log("Status Code:", response.status);

    if (response.ok) {
      const result = await response.json();

      main_box.classList.remove("visually-hidden");
      error_box.innerHTML = "";

      loder.classList.add("visually-hidden");
      console.log(result);
      temp.innerHTML = result.temp + "°C";
      humidity.innerHTML = result.humidity;
      min_temp.innerHTML = result.min_temp + "°C";
      max_temp.innerHTML = result.max_temp + "°C";
      sunrise.innerHTML = new Date(result.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit",  minute: "2-digit", }) + " AM";
      sunset.innerHTML = new Date(result.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", }) + " PM";
      displayCity.innerHTML = city;
    } else {
      console.log("no location found");
      main_box.classList.add("visually-hidden");

      loder.classList.add("visually-hidden");
      error_box.innerHTML = "Oops! This place doesn't exist";
    }
  } catch (error) {
    console.error(error);
  }
}

getData("Surat");
cityname.value = "Surat";
