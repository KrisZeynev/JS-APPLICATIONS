function attachEvents() {
  const getWeatherBtn = document.querySelector('#submit');
  const location = document.querySelector('#location');
  const forecastDiv = document.querySelector('#forecast');
  const forecastLabel = document.querySelector('#current > div');
  const currentDiv = document.querySelector('#current');
  const upcomingDiv = document.querySelector('#upcoming');

  const conditions = {
    Sunny: '&#x2600;',
    'Partly sunny': '&#x26C5;',
    Overcast: '&#x2601;',
    Rain: '&#x2614;',
    Degrees: '&#176;',
  };

  getWeatherBtn.addEventListener('click', onClick);

  async function onClick(e) {
    //Clear previous data
    // Check if previous data exists
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
    //Set the div with id = 'forecast' to visible
    forecastDiv.style.display = 'block';
    forecastLabel.innerHTML = 'Current conditions';

    try {
      //Make a get request, response => arr of objects
      const response = await fetch(
        `http://localhost:3030/jsonstore/forecaster/locations`
      );
      const arrOfObjects = await response.json();
      // arrOfObjects.forEach(({ code, name }) => {
      //   console.log(code);
      //   console.log(name);
      // });

      //Find the object, corresponding from arrOfObjects
      const correspondingObj = arrOfObjects.find(
        (x) => x.name === location.value
      );

      //Make 2 more GET requests
      //First => Forecast and name:
      const firstResponse = await fetch(
        `http://localhost:3030/jsonstore/forecaster/today/${correspondingObj.code}`
      );
      const singleLocationData = await firstResponse.json();

      //Second => 3-day forecast / Forecast = ArrOf3 and name:
      const threedayForecastResponse = await fetch(
        `http://localhost:3030/jsonstore/forecaster/upcoming/${correspondingObj.code}`
      );
      const threedayForecastData = await threedayForecastResponse.json();

      //Append current single location inside the div with id = 'current'

      //1. create main div with class = 'forecasts'
      const forecastsDiv = document.createElement('div');
      forecastsDiv.className = 'forecasts';

      // forecastDiv.classList.add('forecasts');

      //Create 2 span to append to forecastsDiv
      //2.1 create span for condition symbol
      const symbolSpan = document.createElement('span');
      symbolSpan.className = 'condition symbol';
      symbolSpan.innerHTML = conditions[singleLocationData.forecast.condition];

      //2.2 create a main span for condition => for the rest data
      const conditionSpan = document.createElement('span');
      conditionSpan.className = 'condition';

      //Create 3 spans for the rest data
      const spanName = document.createElement('span');
      spanName.className = 'forecast-data';
      spanName.innerHTML = singleLocationData.name;

      const spanDegrees = document.createElement('span');
      spanDegrees.className = 'forecast-data';
      spanDegrees.innerHTML = `${singleLocationData.forecast.low}${conditions.Degrees}/${singleLocationData.forecast.high}${conditions.Degrees}`;

      const spanCondtionValue = document.createElement('span');
      spanCondtionValue.className = 'forecast-data';
      spanCondtionValue.innerHTML = singleLocationData.forecast.condition;

      //Append rest data to their mainSpan
      conditionSpan.appendChild(spanName);
      conditionSpan.appendChild(spanDegrees);
      conditionSpan.appendChild(spanCondtionValue);

      //Append conditionSymbolSpan and condtionSpan to their div
      forecastsDiv.appendChild(symbolSpan);
      forecastsDiv.appendChild(conditionSpan);

      //Append forecastsDiv to the mainDiv => #current
      currentDiv.appendChild(forecastsDiv);

      //3 days forecast logic
      //Create a main div for 3 days forecast
      const forecastInfo = document.createElement('div');
      forecastInfo.className = 'forecast-info';

      //Create span for every day of 3 days forecast
      const foreacastArr = threedayForecastData.forecast;
      foreacastArr.forEach(({ condition, high, low }) => {
        //main
        const spanUpcoming = document.createElement('span');
        spanUpcoming.className = 'upcoming';

        //symbol
        const spanSymbol = document.createElement('span');
        spanSymbol.className = 'symbol';
        spanSymbol.innerHTML = conditions[condition];

        //degrees
        const spanDegrees = document.createElement('span');
        spanDegrees.className = 'forecast-data';
        spanDegrees.innerHTML = `${low}${conditions.Degrees}/${high}${conditions.Degrees}`;

        //condition
        const spanCondtion = document.createElement('span');
        spanCondtion.className = 'forecast-data';
        spanCondtion.innerHTML = condition;

        //Append to main
        spanUpcoming.appendChild(spanSymbol);
        spanUpcoming.appendChild(spanDegrees);
        spanUpcoming.appendChild(spanCondtion);

        //Append to forecastInfoDiv
        forecastInfo.appendChild(spanUpcoming);
      });
      //Append forecastInfoDiv to upcomingDiv
      upcomingDiv.appendChild(forecastInfo);
    } catch (error) {
      forecastLabel.innerHTML = 'Error';

      if (document.querySelector('#current > div:nth-child(2)')) {
        document.querySelector('#current > div:nth-child(2)').remove();
        const threeDaysForecastSpans = document.querySelectorAll(
          '#upcoming > div.forecast-info > span'
        );
        threeDaysForecastSpans.forEach((x) => x.remove());
      }
    }
  }
}

attachEvents();
