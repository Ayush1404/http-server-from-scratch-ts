import * as net from 'node:net';
import * as fs from 'fs'
import * as pathlib from 'path';
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const request = data.toString();
        console.log(request);
        const method = request.split(' ')[0]
        const path = request.split(' ')[1];
        console.log(path.split('/')[1])
        const params = path.split('/')[1];
        let response: string;
        function changeResponse(response: string): void {
            socket.write(response);
            socket.end();
        }
        switch(method) {
            case 'POST' : {
                switch(params){
                    case 'files':{
                        const fileName = path.split('/')[2]
                        console.log(process.argv)
                        const args = process.argv.slice(3)
                        console.log(args)
                        const filePath = pathlib.join(args[0], fileName);
                        const req = request.split('\r\n')
                        const content = req[req.length - 1]
                        console.log(filePath)
                        console.log(fileName)
                        console.log(content)
                        try{
                            const data = fs.writeFileSync(filePath,content)
                            console.log(data)
                            response = `HTTP/1.1 201 Created\r\n\r\n`
                            changeResponse(response)
                        }catch(err:any)
                        {
                            console.log(err)
                        }
                    }
                        
                }
            }
            case 'GET' :{
                switch (params) {
                    case '': {
                        response = 'HTTP/1.1 200 OK\r\n\r\n'
                        changeResponse(response)
                        break;
                    }
                    case 'files': {
                        const fileName = path.split('/')[2]
                        console.log(process.argv)
                        const args = process.argv.slice(3)
                        console.log(args)
                        const filePath = pathlib.join(args[0], fileName);
                        console.log(filePath)
                        console.log(fileName)
                        let response:string;
                        if(fs.existsSync(filePath))
                        {
                            try{
                                const data = fs.readFileSync(filePath) 
                                console.log(data)
                                response = `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${data.length}\r\n\r\n${data}`
                                changeResponse(response)
                            }catch(err:any)
                            {
                                console.log(err)
                            }
                        }
                        else{
                            response = `HTTP/1.1 404 Not Found\r\n\r\n`
                            changeResponse(response)
                        }
                        
                    }
                    case 'echo': {
                        const message = path.split('/')[2]
                        response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${message.length}\r\n\r\n${message}`
                        changeResponse(response)
                        break;
                    }
                    case 'user-agent': {
                        const userAgent = request.split('User-Agent: ')[1].split('\r\n')[0]
                        response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`
                        changeResponse(response)
                        break;
                    }
                    default: {
                        response = 'HTTP/1.1 404 Not Found\r\n\r\n'
                        changeResponse(response)
                        break;
                    }
                }
            }
        }
        
        socket.end()
    })
});
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
// Uncomment this to pass the first stage
server.listen(4221, 'localhost', () => {
    console.log('Server is running on port 4221');
});