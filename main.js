// fetching the data

async function getData() {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const data = await response.json();
    const lat = data.latitude;
    const lng = data.longitude;
    const visi = data.visibility;
    document.querySelector(".lat").textContent = "latitude : " + lat;
    document.querySelector(".lng").textContent = "longitude : " + lng;
    document.querySelector(".visi").textContent = "Visibility : " + visi;



    return { lat, lng };

};


// adding the map

let mymap = L.map("myMap").setView([0, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

}).addTo(mymap);
let myIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [80, 80],
    iconAnchor: [40, 40],

});
let marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a the ISS,im right here now.").openPopup();




var circle = L.circle([0, 0], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 1000
}).addTo(mymap);
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on("click", onMapClick);



async function whereIsTheISS() {
    const { lat, lng } = await getData();
    console.log(lat, lng);
    mymap.setView([lat, lng], 3);
    marker.setLatLng([lat, lng]);
    circle.setLatLng([lat, lng]);

};
setInterval(whereIsTheISS, 2000)






{}