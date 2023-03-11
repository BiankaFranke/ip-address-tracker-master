// DECLARATIONS
const myAPI = config.API;
const btn = document.querySelector('#btnSubmit');
let inputIP = document.querySelector('#inputIP');
const ip = document.querySelector('#ip');
const ort = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const isp = document.querySelector('#isp');
let url = `http://geo.ipify.org/api/v2/country,city?apiKey=${myAPI}`;

// INITIAL MAP
let map = L.map('map', {
    zoomControl: false,
    dragging: false,
}).setView([0, 0], 13);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
map.scrollWheelZoom.disable();
let marker = L.marker([0, 0]).addTo(map);

// INITIAL API FETCH
fetch(url)
.then((response) => response.json())
.then((data) => {
    let outputIP = data['ip'];
    let outputCountry = data['location']['region'];
    let outputCity = data['location']['city'];
    let outputTimezone = data['location']['timezone'];
    let outputIsp = data['isp'];

    ip.innerText = outputIP;
    ort.innerText = `${outputCountry}, ${outputCity}`;
    timezone.innerText = `UTC ${outputTimezone}`;
    isp.innerText = outputIsp;
    map.setView([data['location']['lat'], data['location']['lng']], 13)
    marker.setLatLng([data['location']['lat'], data['location']['lng']])
});

// EVENTLISTENER
btn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`${url}&ipAddress=${inputIP.value}`)
    .then((response) => response.json())
    .then((data) => {
        let outputIP = data['ip'];
        let outputCountry = data['location']['region'];
        let outputCity = data['location']['city'];
        let outputTimezone = data['location']['timezone'];
        let outputIsp = data['isp'];

        ip.innerText = outputIP;
        ort.innerText = `${outputCountry}, ${outputCity}`;
        timezone.innerText = `UTC ${outputTimezone}`;
        isp.innerText = outputIsp;
        map.setView([data['location']['lat'], data['location']['lng']], 13)
        marker.setLatLng([data['location']['lat'], data['location']['lng']])
    });
});