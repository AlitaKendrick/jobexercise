
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
      $("#name-input").val("");
      $("#role-input").val("");
      $("#start-input").val("");
      $("#monthly-rate-input").val("");
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

     // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().role);
      console.log(childSnapshot.val().startDate);
      console.log(childSnapshot.val().monthlyRate);
      
      monthsWorked = moment().diff(moment(childSnapshot.val().startDate), "months")
      // full list of items to the well
      $("#emp-table").append("<tr> <td>" + childSnapshot.val().name + "</td>" +
          "<td>" + childSnapshot.val().role + "</td>" +
          "<td>" + childSnapshot.val().startDate + "</td>" +
          "<td>" + monthsWorked + "</td>" +
          "<td>" + childSnapshot.val().monthlyRate + "</td>" +
          "<td>" + ("$" + childSnapshot.val().monthlyRate * monthsWorked) + "</td>" +
        "</tr>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      // Change the HTML to reflect
      $("#name-display").html(snapshot.val().name);
      $("#email-display").html(snapshot.val().email);
      $("#age-display").html(snapshot.val().age);
      $("#comment-display").html(snapshot.val().comment);
    });

