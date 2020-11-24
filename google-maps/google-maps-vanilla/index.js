// Initialize and add the map
function initMap() {

	//McMaster university logitude and latitude
	const mcmasterLocation = { lat: 43.26094539110192, lng: -79.91916639360102 };
	
	//Create teh map centered at mcmaster
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 12,
		center: mcmasterLocation,
	});
	
	//Add a marker at mcmaster
	const marker = new google.maps.Marker({
		position: mcmasterLocation,
		map: map,
	});
}