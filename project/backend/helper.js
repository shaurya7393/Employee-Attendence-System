let timestamp = Date.now(); // Get current timestamp in milliseconds
let dateObject = new Date(timestamp); // Create a new Date object

// Extract hours, minutes, and seconds from the date object
let hours = dateObject.getHours();
let minutes = dateObject.getMinutes();
let seconds = dateObject.getSeconds();

// Format the time components if needed (add leading zeros)
 let formattedTime = `${hours}:${minutes}:${seconds}`;
module.exports={formattedTime};
// console.log(formattedTime); // Output the formatted time
