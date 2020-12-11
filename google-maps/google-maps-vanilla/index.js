// Auth stuff
firebase.auth().onAuthStateChanged(function (user) {
	var uid = null;
	if (user) {
		// User is signed in.
		getAllMarkers();
		uid = user.uid;
	} else {
		// redirect to login page
		uid = null;
		window.location.replace("login.html");
	}
});

function logOut() {
	firebase.auth().signOut();
};

// Maps Stuff
let googleMap;

// Initialize and add the map
function initMap() {

	//McMaster university logitude and latitude
	const mcmasterLocation = { lat: 43.26094539110192, lng: -79.91916639360102 };

	//Create the map centered at mcmaster
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 15,
		center: mcmasterLocation,
	});

	//Add a marker at mcmaster
	const marker = new google.maps.Marker({
		position: mcmasterLocation,
		map: map,
	});

	// Listener for address input
	const geocoder = new google.maps.Geocoder();
	document.getElementById("address-submit").addEventListener("click", () => {
		geocodeAddress(geocoder, map);
	});

	googleMap = map
}

// fetch data for address input
function geocodeAddress(geocoder, resultsMap) {
	const address = document.getElementById("address").value;
	geocoder.geocode({ address: address }, (results, status) => {
	  if (status === "OK") {
		resultsMap.setCenter(results[0].geometry.location);
		new google.maps.Marker({
		  map: resultsMap,
		  position: results[0].geometry.location,
		});
		if (results[0]) {
		  saveAddress(results[0].geometry.location.lat(), results[0].geometry.location.lng());
		}
	  } else {
		alert("Geocode was not successful for the following reason: " + status);
	  }
	});
}

// fetch data
async function getAllMarkers() {
	const collection = await firebase.firestore().collection('/Locations').get();
	const markers = [];

	collection.forEach(doc => {
		markers.push(doc.data())

		const marker = new google.maps.Marker({
			position: {
				lat: parseFloat(doc.data().Lat),
				lng: parseFloat(doc.data().Lng)
			},
			map: googleMap
		})

	})

	console.log(markers);
	return markers;

}

//Create an entry in the DB
async function saveLocation() {

	const lat = document.getElementById('latTextBox').value;
	const long = document.getElementById('longTextBox').value;

	try {
		const x = parseFloat(lat);
		const y = parseFloat(long);

		if (isNaN(x) || isNaN(y)) {
			console.error('Invalid Input');
			return;
		}
	} catch (err) {
		console.err();
		return;
	}

	await firebase.firestore().collection('/Locations').add({
		Lng: long,
		Lat: lat
	});

	getAllMarkers();
}

// Create an entry in the DB for address
async function saveAddress(lat, long) {
	await firebase.firestore().collection('/Locations').add({
		Lng: long.toString(),
		Lat: lat.toString()
	});
}


// Searchbar stuff
let search = document.getElementById("address");
search.addEventListener("keyup", function(event) {
	if (event.code === "Enter") {
		document.getElementById("address-submit").click();
	}
})