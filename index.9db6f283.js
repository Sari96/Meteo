let e,t,a,i;const l=(e,t)=>{a=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${t}&`,fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${e}&lon=${t}&appid=ca0bc81789a77b485742ed7b77c9a1b9&limit=0`).then(e=>e.json()).then(a=>{$("h1").append(a[0].name),s(e,t)})},r=(e,t)=>{var a;return 0==e?a="clear":[1,2,3].includes(e)?a="partly_cloudly":[45,48].includes(e)?a="foggy":[51,53,55,56,57,61,66,80].includes(e)?a="drizzle":[63,65,67,81,82].includes(e)?a="rain":[71,73,75,77,85,86].includes(e)?a="snow":[95,96,99].includes(e)&&(a="thunder"),"resources/"+a+"_"+t+".svg"},s=(t,i)=>{let l=a+"timezone=auto&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weathercode,sunrise,sunset";console.log(l),fetch(l).then(e=>e.json()).then(a=>{e=a,a.daily.time.forEach((e,t)=>{let i=new Date(e),l=Math.round((a.daily.temperature_2m_max[t]+a.daily.temperature_2m_min[t])/2),s=r(a.daily.weathercode[t],1);console.log(s),$("#dateBar").append(`
      <label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio-${i.getDate()}" autocomplete="off" onclick="setWeatherDate(${t})">
        <div class="card d-flex flex-column justify-content-between">
          <div class="card-body">
            <h5 class="card-title">${l} \xb0C</h5>
            <img src="${s}"/>
            <h5 class="card-title day">${i.toLocaleDateString("it-IT",{weekday:"short"})}</h5>
          </div>
        </div>

        <!-- <img src="..." class="card-img-top" alt="...">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>-->
      </label>`)}),c(t,i)})},c=()=>{let e=a+"hourly=temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m,winddirection_10m,precipitation,precipitation_probability,weathercode,is_day";console.log(e),fetch(e).then(e=>e.json()).then(e=>{t=e,o(0)})},o=a=>{console.log(`Called setWeatherDate(${a})`),$("#dateBar .card.selected").removeClass("selected"),$("#dateBar .card").eq(a).addClass("selected"),i=a;let l=new Date,s=new Date(e.daily.time[a]),c=s.toLocaleDateString("it-IT",{year:"numeric"})+"-"+s.toLocaleDateString("it-IT",{month:"2-digit"})+"-"+s.toLocaleDateString("it-IT",{day:"2-digit"});$("#sunrise").html(`${new Date(e.daily.sunrise[i]).toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}`),$("#sunset").html(`${new Date(e.daily.sunset[i]).toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}`),$("#temp_min").html(`${e.daily.temperature_2m_min[i]} \xb0C`),$("#temp_max").html(`${e.daily.temperature_2m_max[i]} \xb0C`);let o="";t.hourly.time.forEach((e,i)=>{if(s=new Date(e),e.startsWith(c)){let e=r(t.hourly.weathercode[i],t.hourly.is_day[i]);minIdx=t.hourly.time.findIndex(e=>new Date(e)>=l),(0==a&&i==minIdx||0!=a&&10==s.getHours())&&($("#main-weather").parent().css({"background-image":"url(resources/background_"+t.hourly.is_day[i]+".png)"}),$("#main-weather").html(`
            <div class="col-5 text-center d-flex flex-column justify-content-evenly">
              <img src="${e}">
              <h5 class="card-title">${s.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</h5>
            </div>
            <div class="col-7 d-flex flex-column justify-content-evenly">
              <h5 class="card-title fs-1">${t.hourly.temperature_2m[i]} \xb0C</h5>
              <p class="card-text fs-3">${s.toLocaleDateString("it-IT",{day:"numeric",month:"long",year:"numeric"})}</p>
              <div class="row">
                <div class="col-2">
                  <img src="resources/humidity.svg" class="d-block">
                </div>
                <div class="col-4">
                  <h5 class="card-title">Umidit\xe0</h5>
                  <p class="card-text">${t.hourly.relativehumidity_2m[i]} %</p>
                </div>
                <div class="col-2">
                  <img src="resources/wind.svg" class="d-block">
                </div>
                <div class="col-4">
                  <h5 class="card-title">Vento</h5>
                  <p class="card-text">${t.hourly.windspeed_10m[i]} km/h</p>
                </div>
              </div>
            </div>
            `)),o+=`
        <div class="d-flex my-4 flex-column justify-content-between">
          <p class="card-text fs-3">${s.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</p>
          <img src="${e}" class="d-block">
          <p class="card-text fs-3">${t.hourly.temperature_2m[i]} \xb0C</p>
        </div>
      `}}),$("#hourlyWeather").html(o)};$(document).ready(()=>{navigator.geolocation.getCurrentPosition(e=>{console.log(e),l(e.coords.latitude,e.coords.longitude)})});
//# sourceMappingURL=index.9db6f283.js.map
