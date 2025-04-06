function attachEvents() {
    let inputId = document.getElementById('location');
    let buttonSubmit = document.getElementById('submit');
    let forecastDivEl = document.getElementById('forecast');
    let currentDivEl = document.getElementById('current');
    let upcomingDivEl = document.getElementById('upcoming');

    let baseUrl = 'http://localhost:3030/jsonstore/forecaster/';
    const symbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': ' &#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    };

    buttonSubmit.addEventListener('click', eventWether);
    async function eventWether(){
        forecastDivEl.style.display = 'block';

        const locationInput = inputId.value;
        const locationResp = await fetch(`${baseUrl}locations`);
        const locationData = await locationResp.json();

        const chosenLocationObj = locationData.find(location => location.name === locationInput);
        const chosenLocationCode = chosenLocationObj.code;
       // console.log(chosenLocationObj);
       // console.log(chosenLocationCode);
       // console.log(locationData);

        const todayForecastResponse = await fetch(`${baseUrl}today/${chosenLocationCode}`);
        const todayForecastData = await todayForecastResponse.json();

        //console.log(todayForecastData);

        const forecastsDivEl = document.createElement('div');
        forecastsDivEl.className = 'forecasts';

        const symbolSpanEl = document.createElement('span');
        symbolSpanEl.className = 'condition symbol';

        const condition = todayForecastData.forecast.condition;
        symbolSpanEl.innerHTML = symbols[condition];

        const conditionWrapperSpanEl = document.createElement('span');
        conditionWrapperSpanEl.className = 'condition';

        const locationSpanEl = document.createElement('span');
        locationSpanEl.className = 'forecast-data';
        locationSpanEl.textContent = todayForecastData.name;

        const degreesSpanEl = document.createElement('span');
        degreesSpanEl.className = 'forecast-data';
        degreesSpanEl.innerHTML = `${todayForecastData.forecast.low}${symbols.Degrees}/${todayForecastData.forecast.high}${symbols.Degrees}`;

        const conditionSpanEl = document.createElement('span');
        conditionSpanEl.className = 'forecast-data';
        conditionSpanEl.textContent = todayForecastData.forecast.condition;

        conditionWrapperSpanEl.appendChild(locationSpanEl);
        conditionWrapperSpanEl.appendChild(degreesSpanEl);
        conditionWrapperSpanEl.appendChild(conditionSpanEl);

        forecastsDivEl.appendChild(symbolSpanEl);
        forecastsDivEl.appendChild(conditionWrapperSpanEl);

        currentDivEl.appendChild(forecastsDivEl);
        ///////////////////////////////////////////////////////////

        
        const threeDayForecastResponse = await fetch(`${baseUrl}/upcoming/${chosenLocationCode}`);
        const threeDayForecastData = await threeDayForecastResponse.json(); 

        //console.log(threeDayForecastData);

        const forecastInfoDivEl = document.createElement('div');
        forecastInfoDivEl.className = 'forecast-info';

        const threeDayForecasts = threeDayForecastData.forecast;

        for (const forecast of threeDayForecasts) {

            const upcomingSpanEl = document.createElement('span');
            upcomingSpanEl.className = 'upcoming';

            const symbolUpSpanEl = document.createElement('span');
            symbolUpSpanEl.className = 'symbol';

            const conditions = forecast.condition;
            symbolUpSpanEl.innerHTML = symbols[conditions];

            const forecastDataSpan = document.createElement('span');
            forecastDataSpan.className = 'forecast-data';
            forecastDataSpan.innerHTML = `${forecast.low}${symbols.Degrees}/${forecast.high}${symbols.Degrees}`

            const forecastDataSpan2 = document.createElement('span');
            forecastDataSpan2.className = 'forecast-data';
            forecastDataSpan2.textContent = forecast.condition;
             
            upcomingSpanEl.appendChild(symbolUpSpanEl);
            upcomingSpanEl.appendChild(forecastDataSpan);
            upcomingSpanEl.appendChild(forecastDataSpan2);
            
            forecastInfoDivEl.appendChild(upcomingSpanEl);

        }
       
        upcomingDivEl.appendChild(forecastInfoDivEl);
        
    }
}

attachEvents();