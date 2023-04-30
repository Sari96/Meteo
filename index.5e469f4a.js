// https://roundsliderui.com/document.html
const API_KEY = "";
let values, dateRangeElement, dateElement, iconElement, dateBarElement;
let startDateIndex;
const loadData = (lat, lng)=>{
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=524901&lat=${lat}&lon=${lng}&appid=ca0bc81789a77b485742ed7b77c9a1b9`;
    console.log(url);
    fetch(url).then((response)=>response.json()).then((data)=>{
        values = data;
        var date;
        data.list.forEach((item, index)=>{
            const currDate = new Date(item.dt_txt);
            if (date == undefined || date.getDate() != currDate.getDate()) {
                date = currDate;
                dateBarElement.append(`<input type="radio" class="btn-check" name="btnradio" id="btnradio-${date.getDate()}" autocomplete="off" onclick="setWeatherDate(${index})">
          <label class="btn btn-outline-primary" for="btnradio-${date.getDate()}">${date.toLocaleString("it-IT", {
                    short: "long",
                    day: "2-digit",
                    month: "2-digit"
                })}</label>`);
            }
        });
        setWeatherDate(0);
        dateRangeElement.roundSlider("enable");
    });
};
const setWeatherDate = (startIndex)=>{
    startDateIndex = startIndex;
    const currDay = new Date(values.list[startIndex].dt_txt).getDate();
    endIndex = values.list.findLastIndex((elem)=>new Date(elem.dt_txt).getDate() == currDay);
    dateRangeElement.roundSlider({
        value: startIndex,
        min: startIndex,
        max: endIndex
    });
    if (startDateIndex == endIndex) dateRangeElement.roundSlider("disable");
    else dateRangeElement.roundSlider("enable");
    setWeatherTime(startIndex);
};
const setWeatherTime = (index)=>{
    const item = values.list[index];
    const date = new Date(item.dt_txt);
    dateElement.html(date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit"
    }));
    iconElement.attr("src", `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`);
};
const setMap = (lat, lng)=>{
    const mapElement = $("#map");
    mapElement.attr("src", `https://www.google.com/maps/embed/v1/place?maptype=satellite&key=${API_KEY}&q=${lat},${lng}`);
    mapElement.removeClass("invisible");
};
$(document).ready(()=>{
    iconElement = $("#dw-icon");
    dateElement = $("#dw-date");
    dateRangeElement = $("#dateRange");
    dateRangeElement.roundSlider({
        radius: 80,
        circleShape: "half-top",
        showTooltip: false,
        value: 0,
        disabled: true,
        min: 0,
        max: 7,
        mouseScrollAction: true,
        keyboardAction: true,
        change: (e)=>setWeatherTime(e.value)
    });
    dateBarElement = $("#dateBar");
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        loadData(lat, lng);
        setMap(lat, lng);
    });
});

//# sourceMappingURL=index.5e469f4a.js.map
