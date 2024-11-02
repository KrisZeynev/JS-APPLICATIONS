function attachEvents() {
  let allSymbols = {
    Sunny: "&#x2600", // ☀
    "Partly sunny": "&#x26C5", // ⛅
    Overcast: "&#x2601", // ☁
    Rain: "&#x2614", // ☂
    Degrees: "&#176", // °
  };
  const getWeatherBtn = document.querySelector("#submit");
  getWeatherBtn.addEventListener("click", async () => {

    // check if there is a previous data
    const previousData = document.querySelector('#current > div.forecasts');
    const previousForecastInfo = document.querySelector(
      '#upcoming > div.forecast-info'
    );

    if (previousData) {
      previousData.remove();
    }

    if (previousForecastInfo) {
      previousForecastInfo.remove();
    }


    document.querySelector('#forecast').style.display = 'block'

    let input = document.querySelector("#location").value;
    let initUrl = "http://localhost:3030/jsonstore/forecaster/locations";
    let arrAllLocations = await fetch(initUrl).then((res) => res.json());

    let correctInput = arrAllLocations.find((x) => x.name == input);

    if (!correctInput) {
      console.log("ne");
      
      document.querySelector("#current > div").innerHTML = 'Error'
      // display error
      return;
    }
    document.querySelector("#current > div").innerHTML = 'Current conditions'
    
    // document.querySelector("#forecast").style.display = "block";

    let todayWeather = await fetch(
      `http://localhost:3030/jsonstore/forecaster/today/${correctInput.code}`
    ).then((res) => res.json());

    

    // first div
    let forecastsDiv = document.createElement("div");
    forecastsDiv.classList.add("forecasts");

    // first span for symbol
    let symbolSpan = document.createElement("span");
    symbolSpan.classList.add("condition");
    symbolSpan.classList.add("symbol");
    symbolSpan.innerHTML = allSymbols[todayWeather.forecast.condition];

    // main span - condition
    let conditionSpan = document.createElement("span");
    conditionSpan.classList.add("condition");

    // span1
    let spanTown = document.createElement("span");
    spanTown.classList.add("forecast-data");
    spanTown.innerHTML = todayWeather.name;

    //span2
    let spanDegrees = document.createElement("span");
    spanDegrees.classList.add("forecast-data");
    spanDegrees.innerHTML = `${todayWeather.forecast.low}${allSymbols.Degrees}/${todayWeather.forecast.high}${allSymbols.Degrees}`;

    // span3
    let spanCond = document.createElement("span");
    spanCond.classList.add("forecast-data");
    spanCond.innerHTML = todayWeather.forecast.condition;

    conditionSpan.appendChild(spanTown);
    conditionSpan.appendChild(spanDegrees);
    conditionSpan.appendChild(spanCond);

    forecastsDiv.appendChild(symbolSpan);
    forecastsDiv.appendChild(conditionSpan);
    document.querySelector("#current").appendChild(forecastsDiv);
    

    // three day forecast
    let upcomingWeather = await fetch(
      `http://localhost:3030/jsonstore/forecaster/upcoming/${correctInput.code}`
    ).then((res) => res.json());

    let mainForThree = document.createElement("div");
    mainForThree.classList.add("forecast-info");
    document.querySelector('#upcoming').appendChild(mainForThree)

    upcomingWeather.forecast.forEach((x) => {
      mainForThree.appendChild(
        createOneThird(
          x.condition,
          x.high,
          x.low
        )
      );
    });
  });

  function createOneThird(cond, h, l) {
    let upcomingS = document.createElement("span");
    upcomingS.classList.add("upcoming");

    let upcomingSymbol = document.createElement("span");
    upcomingSymbol.classList.add("symbol");
    upcomingSymbol.innerHTML = allSymbols[cond];

    let upcomingDegree = document.createElement("span");
    upcomingDegree.classList.add("forecast-data");
    upcomingDegree.innerHTML = `${l}${allSymbols.Degrees}/${h}${allSymbols.Degrees}`;

    let upcomingCond = document.createElement("span");
    upcomingCond.classList.add("forecast-data");
    upcomingCond.innerHTML = cond;

    upcomingS.appendChild(upcomingSymbol);
    upcomingS.appendChild(upcomingDegree);
    upcomingS.appendChild(upcomingCond);

    return upcomingS;
  }
}
attachEvents();

// document.querySelector("#posts").replaceChildren();
