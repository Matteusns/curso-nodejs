const fs = require('fs');
const http = require('http');
const server = http.createServer()

server.on('request', (req, res) => {
    // Solution 1 = to small response size
    /* fs.readFile('test-file.txt', (err, data) =>{
        if (err) console.error(err);
        res.end(data)
    }) */

    //Solution 2 (Streams) = to large response size
    /* const readable = fs.createReadStream('test-file.txt')
    readable.on('data', chunk => {
        res.write(chunk)
    })
    readable.on('end', () => res.end())
    readable.on('error', err => {
        res.statusCode = 500
        console.error(err)
        res.end(`File not found!`)
    }) */

    //Solution 3
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res);
    
    // arquivoLido.pipe(destino)

})

server.listen(8000, '127.0.0.1', (err, res) => {
    console.log('Server listening on 8000')
})