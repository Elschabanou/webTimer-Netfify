// writeEvent.js

const fs = require('fs');

exports.handler = async (event) => {
  const eventData = JSON.parse(event.body);

  try {
    // Read existing events from file
    const existingData = fs.readFileSync('/json/events.json', 'utf8');
    const events = JSON.parse(existingData);

    // Append new event
    events.push(eventData);

    // Write updated data back to file
    fs.writeFileSync('/json/events.json', JSON.stringify(events, null, 2));

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
