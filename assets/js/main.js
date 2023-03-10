console.log('it works');

// DECLARATIONS
const myAPI = config.API;
const btn = document.querySelector('#btnSubmit');
let inputIP = document.querySelector('#inputIP');
const ip = document.querySelector('#ip');
const ort = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const isp = document.querySelector('#isp');
let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${myAPI}&ipAddress=${inputIP.value}`

// https://api.ipify.org?format=json
// https://api.ipify.org

// EVENTLISTENER
btn.addEventListener('click', (e) => {
    e.preventDefault();
    // findIP();
    let getIP = inputIP.value;

    if(getIP == '') {
        getIP = '8.8.8.8';
    } else {
        getIP = inputIP.value;
    };

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // let outputIP = data['ip'];
        let outputCountry = data['location']['region'];
        let outputCity = data['location']['city'];
        let outputTimezone = data['location']['timezone'];
        let outputIsp = data['isp'];

        ip.innerText = getIP;
        ort.innerText = `${outputCountry}, ${outputCity}`;
        timezone.innerText = `UTC ${outputTimezone}`;
        isp.innerText = outputIsp;
    });
    
})
