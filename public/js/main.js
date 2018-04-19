// Initialize Firebase
var config = {
    apiKey: "AIzaSyBnRmVqS4AC7f0axIRG2OW1-fbXhXBK3HQ",
    authDomain: "simplechat-aeed2.firebaseapp.com",
    databaseURL: "https://simplechat-aeed2.firebaseio.com",
    projectId: "simplechat-aeed2",
    storageBucket: "simplechat-aeed2.appspot.com",
    messagingSenderId: "616577951962"
    };
    firebase.initializeApp(config);

    function iniciarChat(){
    var txtNombre=document.getElementById("user");
    var txtMensaje=document.getElementById("mensaje");
    var btnEnviar=document.getElementById("btnEnviar");
    var chatUl=document.getElementById("chatUl");

    btnEnviar.addEventListener("click", function(){
    var nombre=txtNombre.textContent;
    var mensaje=txtMensaje.value;   
    firebase.database().ref('chat').push({
        name:nombre,
        message:mensaje
    }); 
    txtMensaje.value="";            
    });

    /*snapshot nos trae los datos*/
    firebase.database().ref('chat').on('value', function(snapshot){
        var html='';
            snapshot.forEach(function(e) {
            var element=e.val();
            var nombre=element.name;
            var mensaje=element.message;
            html+="<li><b>"+nombre+": </b>"+mensaje+"</li>";
            });
            chatUl.innerHTML=html;
        });
    }
function autenticacionGoogle(){
    if(!firebase.auth().currentUser){

        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user.displayName;
            console.log(user.displayName);

            $('#login').css('display','none') && $('#chat').css('display','block');
            document.getElementById('user').innerHTML=user;
            iniciarChat();
            
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        });
    }else{
        firebase.auth().signOut();
    }
    
}

document.getElementById('btnGoogle').addEventListener('click',autenticacionGoogle,false);