const fs = require('fs');
const superagent = require('superagent'); // Serve para fazer a chamada http

const readFilePromise = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('File not found 😪');
            resolve(data);
        })
    })
}

readFilePromise(`${__dirname}/dog.txt`).then((data) => {
    console.log(`Bread: ${data}`)

    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => { // .then para Sucessso
            console.log(res.body.message)

            fs.writeFile('dog-img.txt', res.body.message, err => {
                if(err) console.log('Not found')
            })
        })
        .catch(err => console.error(err.message)) // .catch para falha
})
