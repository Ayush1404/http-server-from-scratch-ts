import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

//Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.on('data',(data)=>{
        const request =  data.toString();
        const path = request.split(' ')[1]
        const isEcho = path.split('/')[1] === 'echo'
        const str = path.split('/')[2]
        const response = isEcho ? `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}` : `HTTP/1.1 404 Not Found\r\n\r\n`
        socket.write(Buffer.from(response))
        socket.end()
    })
    
    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");
