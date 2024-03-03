const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userConatiner = document.querySelector(".weather-container");

const grantAccessConatiner= document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-conatiner");
const userInfoContainer= document.querySelector(".user-info-conatiner");
const errorScreen  = document.querySelector(".error-container");


// initially variable
const API_key = "a9797fac043659c8f1fbae4f9c9db1a5";
let currentTab= userTab;
currentTab.classList.add("current-tab");
getFromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
    }
    if(!searchForm.classList.contains("active"))
    {
        userInfoContainer.classList.remove("active");
        grantAccessConatiner.classList.remove("active");
        searchForm.classList.add("active");
    }
    else{
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        getFromSessionStorage();
    }
}

userTab.addEventListener("click" , () =>{
    // passed clicked tab
    switchTab(userTab);
});

searchTab.addEventListener("click" , () =>{
    // passed clicked tab
    switchTab(searchTab);
});

function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessConatiner.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}
async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    grantAccessConatiner.classList.remove("active");
    loadingScreen.classList.add("active");

    try{
        
        const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
        if(response.status !== 200){
            loadingScreen.classList.remove("active");
            userInfoContainer.classList.remove("active");
            errorScreen.classList.add("active");
            return;
        }
        const data =await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        errorScreen.classList.remove("active");
        renderWeatherInfo(data);
    }
    catch(error){
        console.log("Error Occured" , error);
        
    }
}

function renderWeatherInfo(response){
    
     const cityName=document.querySelector("[data-cityName]");
     const countryIcon= document.querySelector("[data-countryIcon]");
     const desc = document.querySelector("[data-weatherDesc]");
     const weatherIcon = document.querySelector("[data-weatherIcon]");
     const temparature = document.querySelector("[data-temparature]");
     const windSpeed = document.querySelector("[data-windSpeed]");
     const humidity = document.querySelector("[data-humidity]");
     const cloudiness = document.querySelector("[data-cloudiness]");

    
    
    cityName.innerText  = response?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${response?.sys?.country.toLowerCase()}.png`;
    desc.innerText = response?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${response?.weather?.[0]?.icon}.png`;
    temparature.innerText = `${response?.main?.temp}°C`; 
    windSpeed.innerText = `${response?.wind?.speed}m/s`;
    humidity.innerText = `${response?.main?.humidity}%`;
    cloudiness.innerText =`${response?.clouds?.all}%`;
}
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPositon);
    }
    else{
        alert("Update Your Browzer");
    }
}
function showPositon(position){
    const userCoordinates = {
        lat:position.coords.latitude,
        lon:position.coords.longitude
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]")

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName == ""){
        return;
    }
    else{
        fetchUserWeatherInfobyCity(cityName);
    }
})
async function fetchUserWeatherInfobyCity(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessConatiner.classList.remove("active");

    try{
        const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
        if(response.status !== 200){
            loadingScreen.classList.remove("active");
            userInfoContainer.classList.remove("active");
            errorScreen.classList.add("active");
            return;
        }
        const data =await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        errorScreen.classList.remove("active");
        renderWeatherInfo(data);
    }
    catch(error){
        console.log(error);
    }
}





































































// const API_key = "bcbea07824364d54c9491d019557a048";
// async function fetchWeatherDetails(){
//     // let latitude = 15.3333;
//     // let logitude =74.0833;

//     // https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${logitude}&appid=${API_key}
//     try{
//         let city_name = "goa";
//         const response =await fetch(` https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`);
        
//         const data =await response.json();
//         console.log("Weather Data -> " ,data);
//         let newPara = document.createElement('p');
//         newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
//         document.body.appendChild(newPara);

//     }
//     catch(err){
//         console.log(err);
//     }
    
// }
// async function getCustomWeatherDetails(){
//     let latitude = 15.3333;
//     let logitude =74.0833;
//     try{
//         const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${logitude}&appid=${API_key}&units=metric`);
        
//         const data =await response.json();
//         console.log("Weather Data -> " ,data);
//         let newPara = document.createElement('p');
//         newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
//         document.body.appendChild(newPara);

//     }
//     catch(err){
//         console.log(err);
//     }
// }








// getCustomWeatherDetails();
// fetchWeatherDetails();