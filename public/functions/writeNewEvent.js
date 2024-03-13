const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const eventData = JSON.parse(event.body);

  try {
    // Get the current working directory of the function
    const functionDir = process.cwd();

    // Construct file paths relative to the function directory
    const eventsFilePath = path.join(functionDir, 'json', 'events.json');

    // Read existing events from file
    const existingData = fs.readFileSync(eventsFilePath, 'utf8');
    const events = JSON.parse(existingData);

    // Append new event
    events.push(eventData);

    // Write updated data back to file
    fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Event saved successfully' }),
    };
  } catch (error) {
    console.error('Error saving event:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving event' }),
    };
  }
};
