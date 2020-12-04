// Initialize and add the map
function initMap() {

	//McMaster university logitude and latitude
	const mcmasterLocation = { lat: 43.26094539110192, lng: -79.91916639360102 };
	
	//Create teh map centered at mcmaster
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 15,
		center: mcmasterLocation,
	});

	
	const marker = new google.maps.Marker({
		position: mcmasterLocation,
		map: map
	})
}

async function getAllMarkers(){
	const collection = await firebase.firestore().collection('/Locations').get()
	const markers = []
	
	collection.forEach( doc => {
		markers.push( doc.data() )
	})
	
	console.log(markers)
	return markers
}