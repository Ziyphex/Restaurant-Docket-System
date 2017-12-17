
	var config = {
	apiKey: "AIzaSyAI4RD9LoiAism8TuzwmpYRNSMaeGwBwV8",
	authDomain: "dishedout-99414.firebaseapp.com",
	databaseURL: "https://dishedout-99414.firebaseio.com",
	projectId: "dishedout-99414",
	storageBucket: "dishedout-99414.appspot.com",
	messagingSenderId: "949450220295"
	};
	firebase.initializeApp(config);


/*<!-- functional code -->*/

	/*variables*/
	var management = document.getElementById("management");

	/*if user is logged in, show div with their name. otherwise say not logged in*/
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	document.getElementById("currentUserLoggedIn").innerHTML = "Logged In: "+ user.displayName;
	    var thisLoggedUser = user.displayName;


	/*declare variables*/
	var choice = document.getElementById("choice");
	var item = document.getElementById("name");
	var button = document.getElementById("but");
	var price = document.getElementById("price");
	var itemsRef="";

	/*listen on button for inserting new items to the menu*/
	button.addEventListener("click", function(){
		itemsRef="";
		console.log(choice.value);
		
		if(choice.value == "starter"){
			itemsRef = firebase.database().ref().child(thisLoggedUser).child("menu").child("starters");
			itemsRef = itemsRef.child(item.value);

		}
		else if(choice.value == "main"){
			itemsRef = firebase.database().ref().child(thisLoggedUser).child("menu").child("mains");
			itemsRef = itemsRef.child(item.value);
		}
		else if(choice.value == "dessert"){
			itemsRef = firebase.database().ref().child(thisLoggedUser).child("menu").child("desserts");
			itemsRef = itemsRef.child(item.value);
		}
		else{
			alert("Please Enter A Course Type");
		}

		itemsRef.set({
			Name: item.value,
			Price: price.value
		});

		/*clear the values entered after submitting them*/
		choice.value = "";
		item.value = "";
		price.value = "";
	});

	/*retrieve info*/
		var rootRef1 = firebase.database().ref().child(thisLoggedUser).child("menu").child("starters");
		var rootRef2 = firebase.database().ref().child(thisLoggedUser).child("menu").child("mains");
		var rootRef3 = firebase.database().ref().child(thisLoggedUser).child("menu").child("desserts");

		rootRef1.on("child_added", snap => {
			var item = snap.child("Name").val();
			$("#starter").append("<li>" + item + "<button class='deleteButton' onclick='del(\""+thisLoggedUser+"\", \"starter\", \"" + item + "\")'>Delete</button><br><br></li>");
		});
		rootRef2.on("child_added", snap => {
			var item = snap.child("Name").val();
			$("#main").append("<li>" + item + "<button class='deleteButton' onclick='del(\""+thisLoggedUser+"\", \"main\", \"" + item + "\")'>Delete</button><br><br></li>");
		});
		rootRef3.on("child_added", snap => {
			var item = snap.child("Name").val();
			$("#dessert").append("<li>" + item + "<button class='deleteButton' onclick='del(\""+thisLoggedUser+"\", \"dessert\", \"" + item + "\")'>Delete</button><br><br></li>");
		});


	/*delete items*/
		$(document).on('click','.deleteButton', function() {
		    $(this).parent().remove();    
		});
			$("#subTabCount").click(function(){
			var tabCount = document.getElementById("tableCount").value;
			var ref = firebase.database().ref().child(thisLoggedUser).child("tableCount");
			ref.set(tabCount);
		});

	} 
	else {
	    console.log("No Log");
	}
	});

	/*delete stuff*/
	function del(theUser, options, theitem){
		var rootRef1 = firebase.database().ref().child(theUser).child("menu").child("starters");
		var rootRef2 = firebase.database().ref().child(theUser).child("menu").child("mains");
		var rootRef3 = firebase.database().ref().child(theUser).child("menu").child("desserts");

		if(options == "starter"){
			//e.remove();
			rootRef1.child(theitem).remove();
		}
		else if(options == "main"){
			rootRef2.child(theitem).remove();
		}
		else{
			rootRef3.child(theitem).remove();
		}
	}

	/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
	function TablesFunction() {
	    document.getElementById("myDropdown").classList.toggle("show");
	}
	function EntriesFunction() {
	    document.getElementById("myEnterDropdown").classList.toggle("show");
	}