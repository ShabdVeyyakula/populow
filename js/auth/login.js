


function login() {

    var email = document.getElementById("emailtxt").value;
    var password = document.getElementById("passtxt").value;

    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log('Login Succesful');
        window.location = '../pages/dash.html'
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Login unSuccesful');
        console.log(email);

    });

}
