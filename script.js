const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "e0cc43fb152d6325b2c37f8f2ff14e6e"
};
const input = document.querySelector("#input");
const btnSearch = document.querySelector("#btn");
const btnShow = document.querySelector("#btnShow");

input.addEventListener("keyup", enter);
btnSearch.addEventListener("click", () => {
    searchCity(input.value);
})

function enter(e){
    if (e.key === "Enter"){
        searchCity(input.value);
    }
}

async function searchCity(data){
    const resInfo = await fetch (`${api.endpoint}weather?q=${data}&units=metric&appid=${api.key}`);
    const resInfoRecieved = await resInfo.json();
    displayResult(resInfoRecieved);

}

function displayResult(resInfoRecieved){
    if(input.value === "") {  
        Swal.fire({
            icon: 'error',
            title: 'You must enter a city',
            text: 'Please, try again!',
        })  
    }
    document.querySelector(".container-data").style.display = "block";
    btnShow.style.display = "block";    
    
    btnShow.addEventListener("click", showExtraInfo);

    function showExtraInfo(){
        document.querySelector(".extraInfo").style.display = "block";
    }    
    
    showDate();

    let city = document.querySelector("#city");
    city.textContent = `${resInfoRecieved.name}, ${resInfoRecieved.sys.country}`;   
    
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.floor(resInfoRecieved.main.temp)}<span>°</span>`;
    
    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `${Math.round(resInfoRecieved.main.feels_like)}<span>°</span>`;

    let minMax = document.querySelector("#minMax");
    minMax.innerHTML = `Min: ${Math.floor(resInfoRecieved.main.temp_min)}<span>°</span>` + '<br>' + `Max: ${Math.floor(resInfoRecieved.main.temp_max)}<span>°</span>`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${resInfoRecieved.main.humidity}%`;

    let description = document.querySelector("#description");
    description.innerHTML = `${resInfoRecieved.weather[0].main}`;
    
    let windSpeed = document.querySelector("#windSpeed");
    windSpeed.innerHTML = `${resInfoRecieved.wind.speed} km/h`;

    gsap.from("#date", {y: -40, duration: 0.3, delay:0.1});
    gsap.from("#city", {y: -40, duration: 0.4, delay:0.3});
    gsap.from("#temperature", {y: -40, duration: 0.3, delay:0.1});


   setInterval(changeColor, 2000);
   const colors = ["radial-gradient(circle, rgba(247,150,192,1) 0%, rgba(118,174,241,1) 100%)", "radial-gradient(circle, rgba(118,174,241,1) 0%, rgba(247,150,192,1) 100%)", "radial-gradient(circle, rgba(118,174,241,1) 0%, rgba(247,150,192,1) 100%)", "radial-gradient(circle,  #fffcdc 0%, #d9a7c7 100%)", "radial-gradient(circle, #d9a7c7  0%, #fffcdc 100%)", "radial-gradient(circle,  #005AA7 0%, #FFFDE4 100%)", "radial-gradient(circle, #FFFDE4 0%, #005AA7 100%)", "radial-gradient(circle, #a8c0ff 0%, #3f2b96 100%)", "radial-gradient(circle, #3f2b96 0%, #a8c0ff 100%)"]
   let i = 0;
   function changeColor(){
       document.body.style.background = colors[i];
       i++;
       if (i > colors.length){
           i = 0;
       }
   }



}

function showDate(){
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = today.getDate();
    let day = days[today.getDay()];
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    let fullDate = document.querySelector("#date");
    fullDate.textContent = `${day}` + ", " + `${date}` + " " + `${month}` + " " + `${year}`;
}
