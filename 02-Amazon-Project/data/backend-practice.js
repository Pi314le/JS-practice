// asynchronous

/*
// 1. create a new HTTP message/request to send to the server/backend
// message = request

const xhr = new XMLHttpRequest();

// 2. set up the request
// parameters:
// method - HTTP method: Type of HTTP message ：GET, POST, PUT, DELETE
// url - where to send the HTTP request
// async, user, password - optional parameters

xhr.open("GET", "https://supersimplebackend.dev");

// 3. This method opens the connection and sends the request to server

xhr.send();

// 4. handle the response
// xhr.send() is asynchronous, so it doesn't block the code execution
// the code below will run immediately after xhr.send() is called, even if the server hasn't responded yet
// But it takes time for the request to travel across the internet

xhr.response;  // undefined
// So this response is not available right away and xhr.response = undefined
*/

// --- Solution ---
// To get the response, we need to wait for the response to come back first and then we can access .response
const xhr = new XMLHttpRequest();

// Two parameters
// 1.the event that we want to listen/wait for
// "load" - means the response is loaded
// 2. A function that we want to run when the event happens
xhr.addEventListener("load", () => {
  // after the response is loaded, we can access the response
  // it contains the response, NOT undefined.
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev");
xhr.send();
