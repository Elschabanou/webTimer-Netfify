// Load events from JSON file
fetch('/json/events.json')
    .then(response => response.json())
   
// Function to display event details
function displayEventDetails(event) {

    var headerElement = document.querySelector('.header-title');
    headerElement.textContent = event.title;

    var eventDescription = document.getElementById('description');
    eventDescription.textContent = event.description;

}