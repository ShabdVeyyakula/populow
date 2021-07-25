

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBTTn85ElbQG4bAdQeC-61oOgELr-Orb6I",
    authDomain: "popu-low.firebaseapp.com",
    projectId: "popu-low",
    storageBucket: "popu-low.appspot.com",
    messagingSenderId: "598472294043",
    appId: "1:598472294043:web:1686b28b0df2db6319d03e",
    measurementId: "G-S1G2WJ6Y31"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();


  window.addEventListener("load", function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
  
      console.log(lat);
      console.log(long);

      localStorage.setItem("lat", lat);
      localStorage.setItem("lon", long);

      var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode({
        'latLng': latlng
      }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            console.log(results[1]);
            localStorage.setItem('adress', results[1]);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });

    });
  });


function getLocation (data) {
    console.log(data.city, data.loc);
    var currentCity = data.city;
    localStorage.setItem('city', currentCity);
    
    var geocoder;

    function initialize() {
    geocoder = new google.maps.Geocoder();
    }


    
};




window.addEventListener('load', (event) => {
    presentcity = localStorage.getItem('city');

    document.getElementById('crowdedareas').innerHTML = ''

    console.log(presentcity);

    var mostOccupied = []

    var addressCount = {}

    db.collection("Cities").doc(presentcity).collection("Points").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            var currentOccupants = 0;

            data = doc.data()

            //console.log(data)
            console.log(doc.id, " => ", doc.data());


            if(addressCount.hasOwnProperty(data['street']) == false){

                addressCount[data['street']] = 0
            }

            addressCount[data['street']] = addressCount[data['street']] + 1


        });
    }).then(() => {

        console.log(addressCount)

        for([key, value] of Object.entries(addressCount)){
            var infobox = `<div class="d-flex justify-content-center">
                <div class="crowditem">
                    <div style="margin-top: 6%; margin-left: 5%;">
                        <p class="crowdtext"><strong>Street: </strong> ${key} </p>
                        <p class="crowdtext"><strong>City: </strong> ${localStorage.getItem('city')} </p>
                        <p class="crowdtext"><strong>Max # of Occupants: </strong> ${2} </p>
                        <p class="crowdtext"><strong># of Occupants: </strong> ${value} </p>
                    </div>

                </div>
                
            </div>`

            $(infobox).appendTo("#crowdedareas")
        }

        
        
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  });

  window.addEventListener('load', (event) => {

    
    
    db.collection("Cities").doc("Mountain House").collection("Points").get().then((querySnapshot) => {
            var LatLng = {lat: 36.778259, lng: -119.417931}
            console.log(LatLng);

            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 5,
                center: LatLng,
            });
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            data = doc.data();

            var latlng = {lat: data.lat, lng: data.lng}

            
            
            new google.maps.Marker({
                position: latlng,
                map,
                title: "Hello World!",
            });
  
  
        });
    }).then(() => {
        
    });
  });


