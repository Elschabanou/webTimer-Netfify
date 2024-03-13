var countDownDate = new Date("Jul 05, 2024 12:30:00").getTime();

// Update the countdown every 1 second
var x = setInterval(function () {

    // Get the current date and time
    var now = new Date().getTime();

    // Calculate the distance between now and the countdown date
    var distance = countDownDate - now;

    // Calculate weeks, days, hours, minutes, and seconds
    var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
    var days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in the elements with the corresponding IDs
    document.getElementById("weeks").innerHTML = weeks < 10 ? "0" + weeks : weeks;
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // If the countdown is over, display a message
    // optional very cool visuals
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);

// Load events from JSON file
fetch('/json/events.json')
    .then(response => response.json())
    .then(events => {
        if (events.length > 0) {
            displayEvents(events);
        } else {
            displayNoEventsMessages();
        }
    }
    )
    .catch(error => console.log(error));

// Function to display events
function displayEvents(events) {
    var eventsList = document.getElementById('eventsList');

    // Loop through the events array and create HTML elements for each event
    events.forEach(function (event) {
        var eventElement = document.createElement('div');
        eventElement.classList.add('event-card');

        var eventName = document.createElement('div');
        eventName.classList.add("title");
        eventName.textContent = event.title;

        var eventDateTime = document.createElement('div');
        eventDateTime.id = "date";
        var dateTime = new Date(event.dateTime);
        eventDateTime.textContent = dateTime.toDateString();

        // Add event link to the event name
        var eventLink = document.createElement('a');
        eventLink.href = 'events/' + 'events.html?title=' + encodeURIComponent(event.title);
        eventLink.appendChild(eventName);

        eventElement.appendChild(eventLink);
        eventElement.appendChild(eventDateTime);

        eventsList.appendChild(eventElement);
    });
}

function displayNoEventsMessages() {
    var eventsList = document.getElementById('eventsList');
    eventsList.textContent = "No events found";
}

// Popup test
document.getElementById("add-Event").addEventListener("click", function () {
    document.getElementById("popup").style.display = "block";
});

document.getElementById("save-event").addEventListener("click", function () {
    // Add your save event logic here
    console.log("Event saved");
    // Close the popup
    document.getElementById("popup").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
    // Close the popup if clicked outside
    document.addEventListener("click", function (event) {
        var popup = document.getElementById("popup");
        var addEventButton = document.getElementById("add-Event");
        var isClickInsidePopup = popup.contains(event.target);
        var isClickOnAddEventButton = addEventButton.contains(event.target);

        if (!isClickInsidePopup && !isClickOnAddEventButton) {
            popup.style.display = "none";
        }
    });
});

var isLoggedIn = sessionStorage.getItem('isLoggedIn');
if (isLoggedIn === 'true') {
    // If logged in, show the button
    document.getElementById('add-Event').style.display = 'block';
}

window.addEventListener('beforeunload', function() {
    // Remove the isLoggedIn flag from sessionStorage
    sessionStorage.removeItem('isLoggedIn');
});

document.getElementById("save-event").addEventListener("click", function () {
    // Get input values
    var eventName = document.querySelector("#popup input[type='text']").value;
    var eventDateTime = document.querySelector("#popup input[type='datetime-local']").value;
    var eventDescription = document.querySelector("#popup textarea").value;

    // Create new event object
    var newEvent = {
        "title": eventName,
        "description": eventDescription,
        "dateTime": eventDateTime
    };

    // Fetch existing events from events.json
    fetch('/json/events.json')
        .then(response => response.json())
        .then(events => {
            // Append new event to events array
            events.push(newEvent);

            // Save updated events array to events.json
            fetch('/json/events.json', {
                method: 'PUT', // Assuming you have backend support for updating the file
                body: JSON.stringify(events),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log("Event saved successfully");
                    // Close the popup
                    document.getElementById("popup").style.display = "none";
                } else {
                    console.error("Failed to save event");
                }
            })
            .catch(error => console.error("Error saving event:", error));
        })
        .catch(error => console.error("Error fetching events:", error));
});
