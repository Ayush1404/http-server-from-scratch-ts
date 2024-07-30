# HTTP Server over TCP

This project implements a basic HTTP server built over a TCP server using the `net` library in Node.js. It demonstrates the fundamental workings of HTTP by manually handling HTTP requests and responses, providing an in-depth understanding of the protocol.

## Overview

Creating this server from scratch provides valuable insights into how HTTP works at a lower level. By manually parsing requests, handling different HTTP methods, and forming appropriate responses, you gain a deeper appreciation for the complexity and importance of HTTP in web communication. This hands-on experience helps reinforce the theoretical concepts of the HTTP protocol, making it easier to understand and troubleshoot real-world web applications.

## Project Structure

The main class, `HTTPHandler`, is responsible for handling incoming HTTP requests. The server supports several routes with different functionalities:

- **`/echo/:message`**: Echoes back the message provided in the path. If the `Accept-Encoding` header includes 'gzip', the response is compressed using gzip.
- **`/user-agent`**: Echoes back the `User-Agent` header from the request.
- **`/files/:filename`**:
  - **GET**: Retrieves a file from the server's directory.
  - **POST**: Uploads a file to the server's directory.

## How to Run

1. Ensure you have Node.js installed.
2. Start the server using the following command:
    ```bash
    npm run dev
    ```

## Route Specifications

### `/echo/:message`
- **Method**: GET
- **Description**: Echoes back the provided message.
- **Content-Encoding**: If the `Accept-Encoding` header includes 'gzip', the response is compressed using gzip.
- **Example Request**: `GET /echo/hello HTTP/1.1`
- **Example Response**: `hello`

### `/user-agent`
- **Method**: GET
- **Description**: Returns the `User-Agent` header from the request.
- **Example Request**: `GET /user-agent HTTP/1.1`
- **Example Response**: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36`

### `/files/:filename`
- **GET**:
  - **Description**: Retrieves a file from the server's directory.
  - **Example Request**: `GET /files/example.txt HTTP/1.1`
  - **Example Response**: Content of `example.txt`

- **POST**:
  - **Description**: Uploads a file to the server's directory.
  - **Example Request**: `POST /files/example.txt HTTP/1.1`
  - **Example Response**: `201 Created`

## Conclusion

Building an HTTP server over a TCP server using the `net` library in Node.js is an excellent way to delve into the intricacies of the HTTP protocol. It provides a clear understanding of how requests are parsed, how headers and bodies are handled, and how responses are formed. This knowledge is crucial for developing robust web applications and for troubleshooting HTTP-related issues effectively.
