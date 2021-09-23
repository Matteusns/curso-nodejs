/*
// cria a classe primeiro dps exporta
class Calculator {
    add (a, b) {
        return a + b
    }
    multiply (a, b) {
        return a * b
    }
    
    divide (a, b) {
        return a / b
    }
}
 
module.exports = Calculator;
*/
// Ja cria a exportação sem precisar criar a classe antes
module.exports = class {
    add (a, b) {
        return a + b
    }
    multiply (a, b) {
        return a * b
    }
    
    divide (a, b) {
        return a / b
    }
}