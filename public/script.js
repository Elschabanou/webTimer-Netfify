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
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);

// Load events from JSON file
fetch('json/events.json')
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

// Get event title from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const eventTitle = urlParams.get('title');

// Function to fetch event details from JSON file and display them
fetch('json/events.json')
    .then(response => response.json())
    .then(events => {
        const event = events.find(event => event.title === eventTitle);
        console.log(event);
        if (event) {
            displayEventDetails(event);
        } else {
            document.getElementById('eventDetails').textContent = 'Event not found';
        }
    })
    .catch(error => console.log('Error fetching events:', error));

// Function to display event details
function displayEventDetails(event) {

    var headerElement = document.querySelector('.header-title');
    headerElement.textContent = event.title;

    var eventDescription = document.getElementById('description');
    eventDescription.textContent = event.description;

}