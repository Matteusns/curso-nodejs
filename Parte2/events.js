const EventEmitter = require('events');
const http = require('http')

class Sales extends EventEmitter {
    constructor() {
        super();
    }
} 

const myEmmitter = new Sales();

myEmmitter.on('newSale', () => {
    console.log('There was a new sale!')
})

myEmmitter.on('newSale', () => {
    console.log('Costumer name: Jonas')
})

myEmmitter.on('newSale', (stock) => {
    console.log(`There are now ${stock} itens left in stock`)
})

myEmmitter.emit('newSale', 9)

///////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request recived')
    res.end('Request received')
})

server.on('request', (req, res) => {
    console.log('Request recived 2')
})

server.on('close', () => {
    console.log('Server closed')
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening on 8000')
})