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

  // works with and without return false
  return false;
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


// displays current time
function clock() {
  let clock = moment().format("h:mm:ss a")
  $("#clock").text("Current Time: " + clock);
  // updates clock every second
  setInterval(function () {
      this.clock();
  }, 1000);
}

clock();