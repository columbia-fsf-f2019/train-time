$(() => {

    console.log("DEBUG js working");
    var firebaseConfig = {
        apiKey: "AIzaSyAU8mVJA8grfzu394GaYpsnLO5_BbTvwuA",
        authDomain: "train-scheduler-3c591.firebaseapp.com",
        databaseURL: "https://train-scheduler-3c591.firebaseio.com",
        projectId: "train-scheduler-3c591",
        storageBucket: "train-scheduler-3c591.appspot.com",
        messagingSenderId: "984798529891",
        appId: "1:984798529891:web:bf8e0ec3cf73957522eb56"
    };
      
      firebase.initializeApp(firebaseConfig);
      var db = firebase.database();

    //   var newTrainName;
    //   var newDestination;
    //   var newTrainTime;
    //   var newFrequency; 

    // function nextTrain(newTrainTime) { 
    //     var timeDiff = moment().diff(moment(newTrainTime, "minutes"));
    //     var timeRemainder = timeDiff % newFrequency;
    //     var minutesAway = newFrequency - timeRemainder;
    //     var arrivingTrain = moment().add(minutesAway, "minutes");
    //     arrivingTrain = moment(arrivingTrain).format("hh:mm A");

    
    // };

    
    $("#add-train-data").click((e) => {
        e.preventDefault();
        newTrainName = $("#train-name").val().trim();
        newDestination = $("#destination").val().trim();
        newTrainTime = $("#train-time").val().trim();
        newFrequency = $("#frequency").val().trim();
        
        // nextTrain();

            var newTrain = {
            train: newTrainName,
            trainTime: newTrainTime,
            destination: newDestination,
            frequency: newFrequency,
            // arrivingTrain
            
        };

        db.ref().push(newTrain);
        console.log(newTrain);
        $("#train-name").val("");
        $("#destination").val("");
        $("#train-time").val("");
        $("#frequency").val("");

    });

    db.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        var train = childSnapshot.val().train;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var nextArrival = childSnapshot.val().nextTrain;
        var minutes = childSnapshot.val().minutesAway;
        
        console.log(train);
        console.log(destination);
        console.log(frequency);
        console.log(nextArrival);
        console.log(minutes);


        var newRow = $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutes)
            
        );
        
        $(".table > tbody").append(newRow);
    });
        
});