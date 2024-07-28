import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

//Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.on('data',(data)=>{
        console.log(data)
        const request =  data.toString();
        const path = request.split(' ')[1]
        const response = path === '/' ? `HTTP/1.1 200 OK\r\n\r\n` : `HTTP/1.1 404 Not Found\r\n\r\n`
        socket.write(Buffer.from(response))
        socket.end()
    })
    // socket.write(Buffer.from(`HTTP/1.1 200 OK\r\n\r\n`));
    // socket.end();
    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");
