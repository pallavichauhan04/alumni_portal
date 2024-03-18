const express=require('express');
const connectToMongo=require('./db')
const cors=require('cors');
const student=require('./routes/student')
const alum=require('./routes/alum')
const job=require('./routes/job')
const applied=require('./routes/applied')
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const { join } = require('node:path');


// const job=require('./routes/job')
const app=express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors:{
    origin:"http://localhost:3000/chattingRoom"
  }
});




//middlewares

app.use(express.json())
app.use(cors())


//routes
app.use('/api/student', student)
app.use('/api/alum', alum)
app.use('/api/job', job)
app.use('/api/applied', applied)




// app.use('/api/job', job)

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

connectToMongo();
// Specify a port number for the server
const port=5000;
// Start the server and listen to the port
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

server.listen(port, () => {
  console.log('server running at http://localhost:5000');
});