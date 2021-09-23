const Calculator = require('./test-module-1') // "./" para pegar modulos próprios
const calc1 = new Calculator()
console.log(calc1.add(5, 55))

const { add, divide } = require('./test-module-2')
console.log(add(5, 55))