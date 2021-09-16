/* 
// ==================== LENDO E ESCREVENDO ARQUIVOS ==================== \\
const fs = require('fs');

// ========== Modo Sincrono ========== \\
 // Lendo arquivo sincrono
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8') 
console.log(textIn);

// Escrevendo arquivo sincrono
const textOut =  `This is what we know about the avocato: ${textIn} \nCreated on ${Date.now()}` 
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File Written')
  
// ========== Modo Asincrono ========== \\
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => { // retorna uma string: "read-this"
    if (err) return console.log("ERRO")
    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Lido com sucesso 😁');
            })
        })
    })
})
console.log('Will read file!')
 */
/* 
// ==================== SERVIDOR BASICO ==================== \\

const http = require('http')

// cria o servidor
const server = http.createServer((req, res) => { 
    //console.log(req)
    res.end('🤖 - Olá do servidor')
})

// Inicia o servidor localhost
server.listen(8000, '127.0.0.1', (err) => {
    console.log('Listenin to request on port 8000')
})
*/

// ==================== API BASICA ==================== \\
const fs = require('fs')
const http = require('http')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)
// cria o servidor
const server = http.createServer((req, res) => { 
    console.log(req.url)


    const pathName = req.url
    if (pathName === '/' || pathName === "/overview"){
        res.end('This is the overview page')
    } else if (pathName === "/product") {
        res.end('This is the product page')
    } else if (pathName === "/api") {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(data)
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'custom-header': 'hello world'
        })
        res.end('<h1>Page not found!</h1>')
    }
})

// Inicia o servidor localhost
server.listen(8000, '127.0.0.1', (err) => {
    console.log('Listenin to request on port 8000')
})