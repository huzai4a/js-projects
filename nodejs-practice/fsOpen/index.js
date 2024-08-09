/*
note: node_modules holds all the dependencies of express and also the dependencies of those dependencies; these are called transitive dependencies

development dependencies are only needed for when the application is run in production mode/server.  e.g. for testing or automatically restarting the application, like nodemon.

with non native scripts in package.json, you need to 'npm run ____' 

REST stands for representational state transfer, and is ment for building scalable apps
*/
/*
npm start - defined in package by me

npm install ____ - just running npm install will work for dependencies listed on the package.json (i.e. shifting package to another computer, loading the dependencies)

npm update - updates dependencies

nodemon (defined as a development dependency) - watches files for changes and auto restarts instead of having to exit out and restart every time
^command was 'npm install --save-dev nodemon'
^start app with 'node_modules/.bin/nodemon index.js', but is defined in package.json as 'nodemon index.js' which is run by 'npm run dev'

*/


// const http = require('http')
const express = require('express');
const app = express();

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

/*
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})
*/

// for the .rest file
app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

/*
The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called. 
*/
app.use(express.json());

app.post('/api/notes', (request, response) => {
  const note = request.body;
  console.log(note);
  response.json(note);
})

/*
Now app.get('/api/notes/:id', ...) will handle all HTTP GET requests that are of the form /api/notes/SOMETHING, where SOMETHING is an arbitrary string.
*/
// :id defines a parameter for a route in express
app.get('/api/notes/:id', (request, response) => {
  // gets whatever is in :id position
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note){
    response.json(note)
  } else {
    response.status(404).end()
  }
});



/*
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  // removes the note with note.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
*/

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})