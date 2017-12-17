
		var config = {
		apiKey: "AIzaSyAI4RD9LoiAism8TuzwmpYRNSMaeGwBwV8",
		authDomain: "dishedout-99414.firebaseapp.com",
		databaseURL: "https://dishedout-99414.firebaseio.com",
		projectId: "dishedout-99414",
		storageBucket: "dishedout-99414.appspot.com",
		messagingSenderId: "949450220295"
		};
		firebase.initializeApp(config);

		/*firebase listeners for page progression*/

		/*listen to create a new user*/
		var button = document.getElementById("sendInfo");
		button.addEventListener("click", function(){

			var company = document.getElementById("company");
			var comp = company.value;
			var uname = document.getElementById("uname");
			var pass = document.getElementById("pass");
			var usern = uname.value;
			var thePass = pass.value;
			
			var create_user = firebase.auth().createUserWithEmailAndPassword(usern, thePass).then(function(e){
				e.updateProfile({
		        	displayName: comp
				}).then(function() {
				    window.location="nextPage.html";
				}, function(error) {
				     console.log("Error");
				});
			});

			create_user.catch(function(error) {
			  	// Handle Errors here.
			  	var errorCode = error.code;
			  	console.log(errorCode);
			  	var errorMessage = error.message;
			  	console.log(errorMessage);
			});
		});

		/*listen to log in a new user*/
		var button2 = document.getElementById("login");
		button2.addEventListener("click", function(){

			var username = document.getElementById("username");
			var password = document.getElementById("password");
			var user = username.value;
			var pass = password.value;

			var theUser = firebase.auth().signInWithEmailAndPassword(user, pass).then(function(){
				window.location="nextPage.html";
			});
			theUser.catch(function(error) {
			  	// Handle Errors here.
			  	var errorCode = error.code;
			  	console.log(errorCode);
			  	var errorMessage = error.message;
			  	console.log(errorMessage);
			  	alert("Your Email or Password is Incorrect!");
			});

		});

		/*check the state of login. if successful, say so and show logged in users name on screen. otherwise, dont.*/
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    console.log("Logged In");
		    console.log(user);
		    document.getElementById("usernameContainer").innerHTML = "<div onclick='forward()'>Logged In: "+user.displayName+"<div>";
		    var thisLoggedUser = user.displayName;

		    /*for sign up*/
		    var txtuser = document.getElementById("uname");
			var txtpassword = document.getElementById("pass");

			/*for log in*/
			var txtuser = document.getElementById("username");
			var txtpassword = document.getElementById("password");

			/*for login/signup*/
			var login = document.getElementById("login");
			var signup = document.getElementById("sendInfo");

		  } else {
		    console.log("Logged Out");
		    $("#usernameContainer").append("");
		  }
		});

		/*if user is signed in and at index.html, this function allows them to get back to their page without relogging*/
		function forward(){
			window.location="nextPage.html"
		}

		$("#newUser").hide();

			$("#blank1").click(function(){
			$("#blank1").css("textDecoration", "underline");
			$("#blank1").css("fontWeight", "bold");
			$("#listen1").css("textDecoration", "none");
			$("#listen1").css("fontWeight", "none");
			$("#blank2").css("textDecoration", "underline");
			$("#blank2").css("fontWeight", "bold");
			$("#listen2").css("textDecoration", "none");
			$("#listen2").css("fontWeight", "none");
			$("#newUser").show();
			$("#currentUser").hide();
		});
		$("#listen1").click(function(){
			$("#blank1").css("textDecoration", "none");
			$("#blank1").css("fontWeight", "none");
			$("#listen1").css("textDecoration", "underline");
			$("#listen1").css("fontWeight", "bold");
			$("#blank2").css("textDecoration", "none");
			$("#blank2").css("fontWeight", "none");
			$("#listen2").css("textDecoration", "underline");
			$("#listen2").css("fontWeight", "bold");
			$("#newUser").hide();
			$("#currentUser").show();
		});
		$("#blank2").click(function(){
			$("#blank1").css("textDecoration", "underline");
			$("#blank1").css("fontWeight", "bold");
			$("#listen1").css("textDecoration", "none");
			$("#listen1").css("fontWeight", "none");
			$("#blank2").css("textDecoration", "underline");
			$("#blank2").css("fontWeight", "bold");
			$("#listen2").css("textDecoration", "none");
			$("#listen2").css("fontWeight", "none");
			$("#newUser").show();
			$("#currentUser").hide();
		});
		$("#listen2").click(function(){
			$("#blank1").css("textDecoration", "none");
			$("#blank1").css("fontWeight", "none");
			$("#listen1").css("textDecoration", "underline");
			$("#listen1").css("fontWeight", "bold");
			$("#blank2").css("textDecoration", "none");
			$("#blank2").css("fontWeight", "none");
			$("#listen2").css("textDecoration", "underline");
			$("#listen2").css("fontWeight", "bold");
			$("#newUser").hide();
			$("#currentUser").show();
		});

		function why(){
			var sendTxt;
			var person = prompt("Please Enter Your Email To Reset Your Password:", "joe@joe.com");
			if((person == null)||(person == "")){
				sendTxt = "No Input Received";
			}
			else{
				sendTxt = "Email Has Been Sent To " + person;
			}
			var authentication = firebase.auth();
			var prom = authentication.sendPasswordResetEmail(person).then(function(){
				alert(sendTxt);
			}).catch( e => console.log(e.message));
		}