
var config = {
   apiKey: "AIzaSyAWpzC4G8HMign764v1_CE02b-Rg4moB48",
   authDomain: "test-test-63488.firebaseapp.com",
   databaseURL: "https://test-test-63488.firebaseio.com",
   storageBucket: "test-test-63488.appspot.com",
   messagingSenderId: "936384974675"
 };


 firebase.initializeApp(config);

 var database = firebase.database();


    // Initial Values
    var name = "";
    var role = "";
    var startDate = 0;
    var monthlyRate = "";
    

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
      
      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      role = $("#role-input").val().trim();
      startDate = $("#start-input").val().trim();
      monthlyRate = $("#monthly-rate-input").val().trim();

      // Code for handling the push
      database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // if snapshot.val has data, run this
      if (snapshot.val() !== null) {
      
      // Getting an array of each key In the snapshot object
      var svArr = Object.keys(sv);

      // Finding the last user's key
      var lastIndex = svArr.length - 1;

      var lastKey = svArr[lastIndex];

      // Using the last user's key to access the last added user object
      var lastObj = sv[lastKey]

      // Console.loging the last user's data
      console.log(lastObj.name);
      console.log(lastObj.role);
      console.log(lastObj.startDate);
      console.log(lastObj.monthlyRate);
    }

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });