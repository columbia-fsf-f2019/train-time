const db = firebase.firestore();

const addTrainBtn = document.querySelector("#submit-btn");
const trainNameInput = document.querySelector("#train-name-input");
const destinationInput = document.querySelector("#destination-input");
const firstTrainInput = document.querySelector("#first-train-input");
const frequencyInput = document.querySelector("#frequency-input");
var inputs = [trainNameInput, destinationInput, firstTrainInput, frequencyInput];

var newTrain = {
    name: trainNameInput,
    destination: destinationInput,
    first: firstTrainInput,
    frequency: frequencyInput
};

database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.first);
console.log(newTrain.frequency);

document.getElementById("train-name-input").value="";
document.getElementById("destination-input").value="";
document.getElementById("first-train-input").value="";
document.getElementById("frequency-input").value="";

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var trainNameInput = childSnapshot.val().name;
    var destinationInput = childSnapshot.val().destination;
    var firstTrainInput = childSnapshot.val().first;
    var frequencyInput = childSnapshot.val().frequency;

    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME:" + diffTime);
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN:" + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME:" + moment(nextTrain).format("HH:mm"));

    var newRow = document.getElementById('myTable')

    





})






