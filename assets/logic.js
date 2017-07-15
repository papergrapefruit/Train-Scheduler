// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC85GVltZiCCU41f5ZLf-2nCX1m9Q9xWHQ",
    authDomain: "train-scheduler-7b1bb.firebaseapp.com",
    databaseURL: "https://train-scheduler-7b1bb.firebaseio.com",
    projectId: "train-scheduler-7b1bb",
    storageBucket: "",
    messagingSenderId: "753861194519"
  };
firebase.initializeApp(config);
// Assign the reference to the database to a variable named 'database'

var database = firebase.database();
//Button for submitting train info to adding
$("#addTr").on("click", function(event) {
    event.preventDefault();
//grab user input
var trName = $("#trainName").val().trim();
var trDest = $("#trainDestination").val().trim();
var trTime = moment($("#trainTime").val().trim(), "HH:mm").format("X");
var trRate = $("#trainFrequency").val().trim();
// Creates local "temporary" object for holding train data
var newTr = {
  name: trName,
  destination: trDest,
  start: trTime,
  rate: trRate
};
// Uploads train data to the database
database.ref().push(newTr);
// Logs everything to console
console.log(newTr.name);
console.log(newTr.destination);
console.log(newTr.start);
console.log(newTr.rate);

// Clears all of the text-boxes
$("#trainName").val("");
$("#trainDestination").val("");
$("#trainTime").val("");
$("#trainFrequency").val("");
});

//Firebase event for train info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trName = childSnapshot.val().name;
  var trDest = childSnapshot.val().destination;
  var trTime = childSnapshot.val().start;
  var trRate = childSnapshot.val().rate;

  // Logs everything to console
  console.log(trName);
  console.log(trDest);
  console.log(trTime);
  console.log(trRate);

// Calculate time until next train

// Setting back time 1 day before current time in order to be able to subtract
var trTimeConverted = moment(trTime, "HH:mm").subtract(1, "years");
console.log(trTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = moment().diff(moment(trTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart remainder
var tRemainder = diffTime % trRate;
console.log(tRemainder);

// Minutes Until Train
var tMinutesTillTrain = trRate - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

// Add each train's data into the table

$("#trainTable > tbody").append("<tr><td>" + trName +  "</td><td>" + trDest +  "</td><td>" + trRate + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

})
