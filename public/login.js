document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get user input
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Fetch JSON data (replace this with actual fetch request)
    fetch('/json/userdata.json')
        .then(response => response.json())
        .then(data => {
            // Check if user credentials match
            var user = data.find(user => user.user === username && user.password === password);
            if (user) {
                // Redirect to home.html if credentials are correct
                window.location.href = '/home.html';
                document.getElementById('errorMessage').style.visibility = "hidden";
                //test
                document.getElementById("add-Event").addEventListener("click", function() {
                    document.getElementById("popup").style.display = "block";
                  });
                  
                  document.getElementById("save-event").addEventListener("click", function() {
                    // Add your save event logic here
                    console.log("Event saved");
                    // Close the popup
                    document.getElementById("popup").style.display = "none";
                  });

            } else {
                // Display error message if credentials are incorrect
                document.getElementById('errorMessage').style.visibility = "visible";
            }
        })
        .catch(error => console.log(error));
});