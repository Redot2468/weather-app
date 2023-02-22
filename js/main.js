const mainContainer = document.querySelector(".main__container");
const searchInput = document.querySelector(".search__location");
const submitBtn = document.querySelector(".submit__btn");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
})

async function getWeather(city){
    try{
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=7db2b037e80a4b56ba9134126232202&q=${city}&aqi=no`);
    if(!res.ok)
      throw new Error(`Error with the api. ${res.status}`);

      const data = await res.json();
      displayWeather(data)
    }

    catch(err){
        console.log(err.message)
    }
}

function displayWeather(weather){
    const html =
        `
        <p class="location">${weather.location.name}</p>
        <p class="cloud">Cloud</p>
        <p class="cloud__info">${weather.current.condition.text}</p>
        <section class="cloud__img"><img src="${weather.current.condition.icon}" alt="" srcset=""></section>
        <h1 class="temperature">${weather.current.temp_c}&#x2103;</h1>
        <div class="wind__humidity">
          <section class="wind__block">
            <p class="cloud wind">Wind</p>
            <p class="cloud__info wind__info">${weather.current.wind_kph}km/h</p>
          </section>

          <section class="humidity__block">
            <p class="cloud humidity">HMD</p>
            <p class="cloud__info humidity__info">${weather.current.humidity}%</p>
          </section>
        </div> 
        `

        mainContainer.innerHTML = html;
}