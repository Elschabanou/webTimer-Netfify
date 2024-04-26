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
    document.getElementById("popup").style.display = "none";
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
    document.getElementById('add-Event').style.display = 'none';
}

window.addEventListener('beforeunload', function () {
    // Remove the isLoggedIn flag from sessionStorage
    sessionStorage.removeItem('isLoggedIn');
});

// Client-side JavaScript code
document.getElementById("save-event").addEventListener("click", function () {
    var eventData = {
        title: document.querySelector("#popup input[type='text']").value,
        dateTime: document.querySelector("#popup input[type='datetime-local']").value,
        description: document.querySelector("#popup textarea").value
    };

    fetch('/.netlify/functions/writeNewEvent', {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Log success message
            // Close the popup
            document.getElementById("popup").style.display = "none";
        })
        .catch(error => console.error("Error saving event:", error));
});

// JavaScript to change background color based on selected radio button
const radioButtons = document.querySelectorAll('input[type="radio"]');
const body = document.getElementById('body');

radioButtons.forEach(button => {
    button.addEventListener('change', function () {
        if (this.checked) {
            switch (this.value) {
                case 'option1':
                    document.body.style.backgroundColor = "#F4FFCA";
                    document.getElementById("seconds").style.color = '#F4FFCA';
                    document.getElementById("date").style.backgroundColor = '#F4FFCA';
                    break;
                case 'option2':
                    document.body.style.backgroundColor = '#CAEFFF';
                    document.getElementById("seconds").style.color = '#CAEFFF';
                    document.getElementById("date").style.backgroundColor = '#CAEFFF';
                    break;
                case 'option3':
                    document.body.style.backgroundColor = '#E4CAFF';
                    document.getElementById("seconds").style.color = '#E4CAFF';
                    document.getElementById("date").style.backgroundColor = '#E4CAFF';
                    break;
                case 'option4':
                    document.body.style.backgroundColor = '#FFC46C';
                    document.getElementById("seconds").style.color = '#FFC46C';
                    document.getElementById("date").style.backgroundColor = '#FFC46C';
                    break;
                default:
                    document.body.style.backgroundColor = '#FFC46C';
                    document.getElementById("seconds").style.color = '#FFC46C';
                    document.getElementById("date").style.backgroundColor = '#FFC46C';
            }
        }
    });
});

