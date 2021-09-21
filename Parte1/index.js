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

const http = require('http') // Para criar o servidor

// declara o servidor 
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
const http = require('http') // para criar o servidor
const url = require('url') // para conseguir passar variaveis pela url
const replaceTemplate = require('./modules/replaceTemplate')
const slugify = require('slugify')

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)
const slugs = dataObj.map(el => slugify(el.productName, {lowercase: true}))
console.log(slugs)

// cria o servidor
const server = http.createServer((req, res) => { 
    const { pathname, searchParams } = new URL(req.url, 'http://127.0.0.1/')
    // overview
    if (pathname === '/' || pathname === "/overview") {
        res.writeHead(200, {'Content-Type': 'text/html'})
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('')
        const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)
        res.end(output)
    } 
    //product
    else if (pathname === "/product") {
        res.writeHead(200, {'Content-Type': 'text/html'})
        const product = dataObj[searchParams.get('id')]
        const output = replaceTemplate(templateProduct, product)
        res.end(output)
    }
    //API
    else if (pathname === "/api") {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(data)
    }
    // Erro
    else {
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
