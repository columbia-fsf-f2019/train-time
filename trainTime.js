// create an onclick .on("click") that will dynamically trigger new
// HTML rows to be generated. This does not involve firebase.

// TODO: Add SDKs for Firebase products that you want to use
//  https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDsFpxyfz7fry-9dcGXhKR8tQQ0zwI4msk",
  authDomain: "train-time-ddcff.firebaseapp.com",
  databaseURL: "https://train-time-ddcff.firebaseio.com",
  projectId: "train-time-ddcff",
  storageBucket: "train-time-ddcff.appspot.com",
  messagingSenderId: "497108582188",
  appId: "1:497108582188:web:966cf26fb9dff8f6e1f689"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

$("#add-train-btn").on("click", function() {
  // Grabs user input

  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = moment(
    $("#train-time-input")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("X");
  var frequency = $("#frequency-input")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  trainData.ref().push(newTrain);

  alert("You added a NEW train!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");

  // return false;
});

trainData.ref().on("child_added", function(snapshot) {
  var trainName = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment()
    .add(minutes, "m")
    .format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

  $("#train-table > tbody").append(
    "<tr><td>" +
      trainName +
      "</td><td>" +
      destination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      arrival +
      "</td><td>" +
      minutes +
      "</td></tr>"
  );
});

// from timesheet exercise

// var database = firebase.database();

// button for adding train

// $("#add-train-btn").on("click", function(event) {
//   event.preventDefault();

// Grabs user input

// var trainName = $("#train-name-input")
//   .val()
//   .trim();
// var destination = $("#destination-input")
//   .val()
//   .trim();
// var firstTrainTime = ($("#train-time-input")
//   .val()
//   .trim(),
// "HH:mm").format("X");
// var howOften = $("#frequency-input")
//   .val()
//   .trim();

// Creates local "temporary" object for holding train data

// var newTrain = {
//   name: trainName,
//   destination: destination,
//   when: firstTrainTime,
//   frequency: howOften
// };

// Uploads train data to the database
// trainData.ref().push(newTrain);

// Logs everything to console
// console.log(newTrain.name);
// console.log(newTrain.destination);
// console.log(newTrain.when);
// console.log(newTrain.frequency);

// test alert
//   alert("Train successfully added");

//   return false;
// });

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
// trainData.ref().on("child_added", function(childSnapshot) {
// console.log(childSnapshot.val());

// Store everything in a variable.
// var trainName = childSnapshot.val().name;
// var destination = childSnapshot.val().destination;
// var firstTrainTime = childSnapshot.val().when;
// var howOften = childSnapshot.val().frequency;

// var remainder =
//   moment().diff(moment.unix(firstTrainTime), "minutes") % howOften;
// var minutes = howOften - remainder;
// var arrival = moment()
//   .add(minutes, "m")
//   .format("hh:mm A");

// console.log(remainer);
// console.log(minutes);
// console.log(arrival);

// })

// Train Info
// console.log(trainName);
// console.log(destination);
// console.log(firstTrainTime);
// console.log(howOften);

// Prettify the train start time
// var firstTrainTimePretty = moment.unix(firstTrainTime.format("HH:mm");

// Calculate the minutes until next train using simple math

// var minutesAway = moment().diff(moment(firstTrainTime, "X"), "minutes");
// console.log(minutesAway);

// Calculate minutes away til next train arrives
// var minutesAway = firstTrainTime + howOften;
// console.log(minutesAway);

// create new row using table data using jQuery <td> element

// var newRow = $("<tr>").append(
//   $("<td>").text(trainName),
//   $("<td>").text(destination),
//   $("<td>").text(howOften),
//   $("<td>").text(firstTrainTimePretty),
//   $("<td>").text(empRate),
//   $("<td>").text(minutesAway)
// );

// Append the new row to the table
// $("#train-table > tbody").append(
// $("<tr>").append(
//     $("<td>").text(trainName),
//     $("<td>").text(destination),
//     $("<td>").text(howOften),
//     $("<td>").text(minutesAway)
//   );
// });

// <!-- TODO: Add SDKs for Firebase products that you want to use
//  https://firebase.google.com/docs/web/setup#available-libraries -->
