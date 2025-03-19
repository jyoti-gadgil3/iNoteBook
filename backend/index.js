const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors')

// DB connection
connectToMongo();

const app = express();
const port = 5000;

// Middleware
app.use(cors())
app.use(express.json())


// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// Starting the server
app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port ${port}`);
});
