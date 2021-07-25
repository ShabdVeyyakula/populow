function signup() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var username = document.getElementById("username").value;


    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            

            db.collection("Users").doc().set({
                email: email,
                name: username,
            })
            .then(() => {
                console.log("Document successfully written!");
                window.location = "../pages/login.html"
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..

            console.log(errorMessage);
            console.log(email);
        });

}