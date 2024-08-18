const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

io.on("connection", (socket) => {
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id:socket.id,...data});
    });
    socket.on("desconnect",()=>{
        io.emit("user-disconnect",socket.id);
    });
    
    console.log("New WebSocket connection");
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(8000, () => {
    console.log("Server running on port 8000");
});
