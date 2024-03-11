// Get event title from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const eventTitle = urlParams.get('title');
// Function to fetch event details from JSON file and display them
fetch('/json/events.json')
    .then(response => response.json())
    .then(events => {
        const event = events.find(event => event.title === eventTitle);
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