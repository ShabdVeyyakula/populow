

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




function getLocation (data) {
    console.log(data.city, data.loc);
    var currentCity = data.city;
    localStorage.setItem('city', currentCity);
    

    
};

window.addEventListener("load", function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
  
      console.log(lat);
      console.log(long);

      localStorage.setItem("lat", lat);
      localStorage.setItem("lon", long);
    });
  });



window.addEventListener('load', (event) => {
    presentcity = localStorage.getItem('city');

    console.log(presentcity);
    db.collection("Cities").doc("Mountain House").collection("Stats").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            data = doc.data()
            console.log(doc.id, " => ", doc.data());

            var infobox = `<div class="d-flex justify-content-center">
                <div class="crowditem">
                    <div style="margin-top: 6%; margin-left: 5%;">
                        <p class="crowdtext"><strong>Street: </strong> ${data.street} </p>
                        <p class="crowdtext"><strong>City: </strong> ${data.city} </p>
                        <p class="crowdtext"><strong>Max # of Occupants: </strong> ${data.max} </p>
                        <p class="crowdtext"><strong># of Occupants: </strong> ${data.current} </p>
                    </div>

                </div>
                
            </div>`

            $(infobox).appendTo("#crowdedareas")
        });
    }).then(() => {

    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  });

  window.addEventListener('load', (event) => {

    
    
    db.collection("Cities").doc("Mountain House").collection("Points").get().then((querySnapshot) => {
            var LatLng = {lat: 37.7794, lng: 121.5432}
            console.log(LatLng);

            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 13,
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


