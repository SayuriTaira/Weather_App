const apiKey = '75e2b92cf095263a080d152d5d9f52e3'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q='

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const responseJson = await response.json()
    
    if(response.status === 404) {
        document.querySelector('.weather').style.display = 'none'
        document.querySelector('.error').style.display = 'flex'
    } else {
        document.querySelector('.temp').innerText = Math.round(responseJson.main.temp) + 'ºC'
        document.querySelector('.city').innerText = responseJson.name
        document.querySelector('.humidity').innerText = responseJson.main.humidity + '%'
        document.querySelector('.wind-speed').innerText = responseJson.wind.speed + ' km/h'
        
        const img = document.querySelector('.weather img')
        
        if(responseJson.weather[0].main === 'Clear') {
            img.src = 'images/clear.png'
        } else if(responseJson.weather[0].main === 'Clouds') {
            img.src = 'images/clouds.png'
        } else if(responseJson.weather[0].main === 'Drizzle') {
            img.src = 'images/drizzle.png'
        } else if(responseJson.weather[0].main === 'Mist') {
            img.src = 'images/mist.png'
        } else if(responseJson.weather[0].main === 'Rain') {
            img.src = 'images/rain.png'
        } else {
            img.src = 'images/snow.png'
        }
    
        document.querySelector('.weather').style.display = 'flex'
        document.querySelector('.error').style.display = 'none'
    }
}

document.querySelector('.search-button').addEventListener('click', () => {
    const searchBox = document.querySelector('.search-box')
    checkWeather(searchBox.value)
})