
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

		/*if user is logged in, show div with their name. otherwise say not logged in*/
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    document.getElementById("currentUserLoggedIn").innerHTML = "Logged in: "+user.displayName;
		    var thisLoggedUser = user.displayName;

		    /* load the number of tables the restaurant has */
		    var ref = firebase.database().ref().child(thisLoggedUser).child("tableCount");
			ref.on("value", snap=>{
				$("#selection").empty();
				$("#selection").append("<option value='blah'>No Table Selected</option>");
				for(var i = 1; i <= snap.val(); i++){
			    	$("#selection").append("<option value='"+i+"'>Table "+i+"</option>");
			    }
			});

			/* Load add, update and deleted menu items according to management usage */
			var starterRef = firebase.database().ref().child(thisLoggedUser).child("menu").child("starters");
			var mainRef = firebase.database().ref().child(thisLoggedUser).child("menu").child("mains");
			var dessertRef = firebase.database().ref().child(thisLoggedUser).child("menu").child("desserts");

			//retrieve and update starters
			starterRef.on("child_added", snap => {
				var item = snap.child("Name").val();
				$("#retrieved_starter_menu").append("<div class='ourItems' id='" + item + "'><li class='starterItem'>" + item + "</li></div>");
			});
			starterRef.on("child_removed", snap => {
				var removal = document.getElementById(snap.key);
				removal.remove();
			});
			//retrieve and update mains
			mainRef.on("child_added", snap => {
				var item = snap.child("Name").val();
				$("#retrieved_main_menu").append("<div class='ourItems' id='" + item + "'><li class='mainItem'>" + item + "</li></div>");
			});
			mainRef.on("child_removed", snap => {
				var removal = document.getElementById(snap.key);
				removal.remove();
			});
			//retrieve and update desserts
			dessertRef.on("child_added", snap => {
				var item = snap.child("Name").val();
				$("#retrieved_dessert_menu").append("<div class='ourItems' id='" + item + "'><li class='dessertItem'>" + item + "</li></div>");
			});
			dessertRef.on("child_removed", snap => {
				var removal = document.getElementById(snap.key);
				removal.remove();
			});

			/* add starter item to the ordered items bar */
			$(document).on('click','.starterItem', thisLoggedUser, function() {
			    var savedStarter = this.innerHTML;
			    var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("starters").child(savedStarter);
			    tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) + parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
			    var theDiv = document.getElementById("starter_docket");    
			    $(theDiv).append("<span class='aligning'> <li class='starter'>"+savedStarter+"</li> <button class='sincremental' value='our"+savedStarter+"'>+</button> <span class='spanPlace' id='our"+savedStarter+"'>1</span> <button class='sdecremental' value='our"+savedStarter+"'>-</button><br><br> </span>");

			});

			/* add main item to the ordered items bar */
			$(document).on('click','.mainItem',thisLoggedUser, function() {
			    var savedMain = this.innerHTML;
			    var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("mains").child(savedMain);
			    tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) + parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
			    var theDiv = document.getElementById("main_docket");   
			    $(theDiv).append("<span class='aligning'> <li class='main'>"+savedMain+"</li> <button class='mincremental' value='our"+savedMain+"'>+</button> <span class='spanPlace' id='our"+savedMain+"'>1</span> <button class='mdecremental' value='our"+savedMain+"'>-</button><br><br> </span>");
			});

			/* add dessert item to the ordered items bar */
			$(document).on('click','.dessertItem',thisLoggedUser, function() {
			    var savedDessert = this.innerHTML;
			    var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("desserts").child(savedDessert);
			    tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) + parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
			    var theDiv = document.getElementById("dessert_docket");   
			    $(theDiv).append("<span class='aligning'> <li class='dessert'>"+savedDessert+"</li> <button class='dincremental' value='our"+savedDessert+"'>+</button> <span class='spanPlace' id='our"+savedDessert+"'>1</span> <button class='ddecremental' value='our"+savedDessert+"'>-</button><br><br> </span>");
			});

			/*listen in on if we increment the item count or decrement the item count*/
			$(document).on('click','.sincremental',thisLoggedUser, function() {
				var savedVal = this.value;
				var destValue = document.getElementById(savedVal).innerHTML;
				destValue++;
				document.getElementById(savedVal).innerHTML = destValue;
				var newSavedVal = savedVal.substring(3);
				var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("starters").child(newSavedVal)
				 tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) + parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
			});
			$(document).on('click','.mincremental',thisLoggedUser, function() {
				var savedVal = this.value;
				var destValue = document.getElementById(savedVal).innerHTML;
				destValue++;
				document.getElementById(savedVal).innerHTML = destValue;
				var newSavedVal = savedVal.substring(3);
				var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("mains").child(newSavedVal)
				 tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) + parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
			});
			$(document).on('click','.dincremental',thisLoggedUser, function() {
				var savedVal = this.value;
				var destValue = document.getElementById(savedVal).innerHTML;
				destValue++;
				document.getElementById(savedVal).innerHTML = destValue;
				var newSavedVal = savedVal.substring(3);
				var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("desserts").child(newSavedVal)
				 tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) + parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
			});

			/* decremental listeners */
			$(document).on('click','.sdecremental',thisLoggedUser, function() {
				var savedVal = this.value;
				var destValue = document.getElementById(savedVal).innerHTML;
				if(destValue == 1){
					var newSavedVal = savedVal.substring(3);
					var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("starters").child(newSavedVal);
					 tempPrice.on("value", snap=>{
						var valDiv = document.getElementById("totalPrice").innerText;
						var vDiv = parseFloat(valDiv) - parseFloat(snap.child("Price").val());
						document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
				    });
					document.getElementById(savedVal).parentElement.remove();
				}
				else{
					var newSavedVal = savedVal.substring(3);
					var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("starters").child(newSavedVal);
					 tempPrice.on("value", snap=>{
						var valDiv = document.getElementById("totalPrice").innerText;
						var vDiv = parseFloat(valDiv) - parseFloat(snap.child("Price").val());
						document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
				    });
					destValue--;
					document.getElementById(savedVal).innerHTML = destValue;
				}
			});

			$(document).on('click','.mdecremental',thisLoggedUser, function() {
			var savedVal = this.value;
			var destValue = document.getElementById(savedVal).innerHTML;
			if(destValue == 1){
				var newSavedVal = savedVal.substring(3);
				var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("mains").child(newSavedVal);
				 tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) - parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
				document.getElementById(savedVal).parentElement.remove();
			}
			else{
				var newSavedVal = savedVal.substring(3);
				var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("mains").child(newSavedVal);
				 tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) - parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
				destValue--;
				document.getElementById(savedVal).innerHTML = destValue;
			}
		});

		$(document).on('click','.ddecremental',thisLoggedUser, function() {
			var savedVal = this.value;
			var destValue = document.getElementById(savedVal).innerHTML;
			if(destValue == 1){
				var newSavedVal = savedVal.substring(3);
				var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("desserts").child(newSavedVal);
				 tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) - parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
				document.getElementById(savedVal).parentElement.remove();
			}
			else{
				var newSavedVal = savedVal.substring(3);
				var tempPrice = firebase.database().ref().child(thisLoggedUser).child("menu").child("desserts").child(newSavedVal);
				 tempPrice.on("value", snap=>{
					var valDiv = document.getElementById("totalPrice").innerText;
					var vDiv = parseFloat(valDiv) - parseFloat(snap.child("Price").val());
					document.getElementById("totalPrice").innerHTML = vDiv.toFixed(2);
			    });
				destValue--;
				document.getElementById(savedVal).innerHTML = destValue;
			}
		});

		/*listen in on the place order button*/
		$("#sendDocket").click(function(){
			var course = document.getElementById("courseSelection").value;

			if(course == "starter"){
				var scurrTable = firebase.database().ref().child(thisLoggedUser).child("tableCount");
				scurrTable.on("value", snap=>{
					var slen = document.getElementById("starter_docket").getElementsByTagName("li").length;
					var firstNode = document.getElementById("starter_docket");
					var tableNumber = document.getElementById("selection").value;
					console.log(slen);
					for(var i = 0; i < slen; i++){
						var item = firstNode.getElementsByTagName("LI")[i].innerHTML;
						var quant = firstNode.getElementsByClassName("spanPlace")[i].innerHTML;
						if(parseInt(tableNumber) <= parseInt(snap.val())){
							var addRootRef = firebase.database().ref().child(thisLoggedUser).child("dockets").child("starter").child(tableNumber); //.child("mains"); .child("desserts");
							var sendingInfo = addRootRef.child(i);
							sendingInfo.set({
								Name: item,
								Quantity: quant
							});
						}	
					}
					firstNode.innerHTML = "";
				});
			}

			else if(course == "main"){
				var mcurrTable = firebase.database().ref().child(thisLoggedUser).child("tableCount");
				mcurrTable.on("value", snap=>{
					var mlen = document.getElementById("main_docket").getElementsByTagName("li").length;
					var secondNode = document.getElementById("main_docket");
					var tableNumber = document.getElementById("selection").value;
					for(var i = 0; i < mlen; i++){
						var item = secondNode.getElementsByTagName("LI")[i].innerHTML;
						var quant = secondNode.getElementsByClassName("spanPlace")[i].innerHTML;
						if(parseInt(tableNumber) <= parseInt(snap.val())){
							var addRootRef = firebase.database().ref().child(thisLoggedUser).child("dockets").child(course).child(tableNumber); //.child("mains"); .child("desserts");
							var sendingInfo = addRootRef.child(i);
							sendingInfo.set({
								Name: item,
								Quantity: quant
							});
						}
					}
					secondNode.innerHTML = "";
				});
			}

			else{
				var dcurrTable = firebase.database().ref().child(thisLoggedUser).child("tableCount");
				dcurrTable.on("value", snap=>{		
					var dlen = document.getElementById("dessert_docket").getElementsByTagName("li").length;
					var thirdNode = document.getElementById("dessert_docket");
					var tableNumber = document.getElementById("selection").value;
					for(var i = 0; i < dlen; i++){
						var item = thirdNode.getElementsByTagName("LI")[i].innerHTML;
						var quant = thirdNode.getElementsByClassName("spanPlace")[i].innerHTML;
						if(parseInt(tableNumber) <= parseInt(snap.val())){
							var addRootRef = firebase.database().ref().child(thisLoggedUser).child("dockets").child(course).child(tableNumber); //.child("mains"); .child("desserts");
							var sendingInfo = addRootRef.child(i);
							sendingInfo.set({
								Name: item,
								Quantity: quant
							});
						}
					}
					thirdNode.innerHTML = "";
				});
			}
			document.getElementById("totalPrice").innerHTML = "0.00";
		});


		/* notifications for if order is ready */
		var starterReady = firebase.database().ref().child(thisLoggedUser).child("dockets").child("starter");
		starterReady.on("child_removed", snap=>{
			alert("Starters for Table " + snap.key + " Are Ready");
		});
		var mainReady = firebase.database().ref().child(thisLoggedUser).child("dockets").child("main");
		mainReady.on("child_removed", snap=>{
			alert("Mains for Table " + snap.key + " Are Ready");
		});
		var dessertReady = firebase.database().ref().child(thisLoggedUser).child("dockets").child("dessert");
		dessertReady.on("child_removed", snap=>{
			alert("Desserts for Table " + snap.key + " Are Ready");
		});

		  } else {
		    console.log("No Log");
		  }
		});

