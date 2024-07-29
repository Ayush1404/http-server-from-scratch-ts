import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

//Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.on('data',(data)=>{
        const request =  data.toString();
        const path = request.split(' ')[1]
        const route =  path.split('/')[1]

        if(route === 'user-agent')
        {
            const headers = request.split('\r\n')
            headers.forEach((header)=>{
                if(header.split(':')[0] === 'User-Agent')
                {
                    const response =`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${header.split(':')[1].length-1}\r\n\r\n${header.split(':')[1].substring(1)}`
                    socket.write(Buffer.from(response))
                    socket.end()
                }
            })
        }
        
        if(route === 'echo')
        {
            const str = path.split('/')[2]
            const response =`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`
            socket.write(Buffer.from(response))
            socket.end()
        }
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
