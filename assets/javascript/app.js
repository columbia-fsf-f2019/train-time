$(function(){
    
    var database = firebase.firestore();

    $("#submit-btn").on("click", function(event) {
       event.preventDefault();
   
     const trainNameInput = $("#train-name-input").val().trim();
     const destinationInput = $("#destination-input").val().trim();
     const firstTrainInput = $("#first-train-input").val().trim();
     const frequencyInput = $("#frequency-input").val().trim();
     
   
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
   
     $("train-name-input").val("");
     $("destination-input").val("");
     $("first-train-input").val("");
     $("frequency-input").val("");
   
    });
   
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
       console.log("ARRIVAL TIME:" + moment(nextTrain).format("HH:mm");
   
       var newRow = $("<tr>").append(
           $("<td>").text(trainNameInput),
           $("<td>").text(destinationInput),
           $("<td>").text(firstTrainInput),
           $("<td>").text(frequencyInput),
           $("<td>").text(tMinutesTillTrain)
        );
   
       $("#mytable > tbody").append(newRow);
    
    });