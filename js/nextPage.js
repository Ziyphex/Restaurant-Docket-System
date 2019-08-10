		var config = {
		apiKey: "AIzaSyAI4RD9LoiAism8TuzwmpYRNSMaeGwBwV8",
		authDomain: "dishedout-99414.firebaseapp.com",
		databaseURL: "https://dishedout-99414.firebaseio.com",
		projectId: "dishedout-99414",
		storageBucket: "dishedout-99414.appspot.com",
		messagingSenderId: "949450220295"
		};
		firebase.initializeApp(config);

		/*variables*/
		var management = document.getElementById("management");
		var waiting = document.getElementById("waiting");
		var chef = document.getElementById("chef");

		/*listen for a lick on the log out button*/
		var button3 = document.getElementById("logout");
		button3.addEventListener("click", function(){
			var signout = firebase.auth().signOut().then(function() {
			  window.location="index.html";
			});
			signout.catch(function(error) {
			  console.log("Error");
			});
		});

		/*if user is logged in, show div with their name. otherwise say not logged in*/
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
			    document.getElementById("currentUserLoggedIn").innerHTML = "Logged in: "+user.displayName;
			    console.log(user);
			    var thisLoggedUser = user.displayName;
			} 
			else {
			    console.log("No Log");
			}
		});

		/*create a listener for management*/
		management.addEventListener("click", function(){
			window.location="anotherNewPage.html";
		});
		waiting.addEventListener("click", function(){
			window.location="newPage.html";
		});
		chef.addEventListener("click", function(){
			window.location="newNext.html";
		});

		function theClock() {
            var today = new Date();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            var seconds = today.getSeconds();
            minutes = check(minutes);
            seconds = check(seconds);
            document.getElementById('clock').innerHTML = hours + ":" + minutes + ":" + seconds;
            var t = setTimeout(theClock, 500);
        }
        function check(e) {
            if (e < 10) {e = "0" + e};
            return e;
        }