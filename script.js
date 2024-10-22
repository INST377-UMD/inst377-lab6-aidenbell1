// Initialize the map centered on the US
const map = L.map('map').setView([38.0, -97.0], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to generate random coordinates
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate 3 sets of random coordinates
const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
];

// Function to fetch the locality of a coordinate
async function getLocality(lat, lon) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    const data = await response.json();
    return data.locality || 'Unknown';
}

// Add markers and fetch locality for each coordinate
coordinates.forEach(async (coord, index) => {
    // Create a marker
    const marker = L.marker([coord.lat, coord.lon]).addTo(map);

    // Fetch locality and display it below the map
    const locality = await getLocality(coord.lat, coord.lon);
    document.getElementById(`marker${index + 1}`).innerHTML = `Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lon} (Locality: ${locality})`;
});
